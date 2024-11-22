const {Hall, validate} = require("../model/hall");
const asyncHandler = require("../middleware/asyncHandler");
const express = require("express");
const auth = require("../middleware/auth");
const semi_auth = require("../middleware/semi-auth");
const admin = require("../middleware/admin");
const {initializeApp} = require("firebase/app");
const firebaseConfig = require("../config/firebase-config");
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
const multer = require("multer");
const _ = require("lodash");
const Joi = require("joi");
const {validateObjectId: validateObjectId_} = require("../model/validateObjId");
const {FavoriteHall, validate: validateFav} = require("../model/favoriteHalls");

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTime;
}
const validateObjectId = value => {
  let schema = {
    eventType: Joi.objectId().required()
  };
  return Joi.validate(value, schema);
};

router.post(
  "/",
  [
    auth,
    admin,
    upload.fields([
      {name: "majorImage", maxCount: 1},
      {name: "images", maxCount: 5}
    ])
  ],
  asyncHandler(async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    try {
      const hall = new Hall(req.body);
      if (req.files["images"]) {
        const imagePromises = req.files["images"].map(async file => {
          const imageRef = ref(storage, `halls/${file.originalname + " " + getCurrentDateTime()}`);
          const imageSnapshot = await uploadBytesResumable(imageRef, file.buffer, {contentType: file.mimetype});
          const imageUrl = await getDownloadURL(imageSnapshot.ref);
          return imageUrl;
        });
        hall.images = await Promise.all(imagePromises);
      }
      if (req.files["majorImage"] && req.files["majorImage"][0]) {
        const file = req.files["majorImage"][0];
        const storageRef = ref(storage, `halls/${file.originalname + " " + getCurrentDateTime()}`);
        const metaData = {contentType: file.mimetype};
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        hall.majorImage = downloadUrl;
      }
      await hall.save(); // Save the hall instance to the database
      res.sendJson(1, 200, "Hall added successfully", hall);
    } catch (err) {
      res.sendJson(1, 400, err, null);
    }
  })
);

// GET /halls --get all halls
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const event = req.query.event;
    const {error} = validateObjectId({eventType: event});
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }

    try {
      const halls = await Hall.find({eventType: {$elemMatch: {$eq: event}}})
        .select("majorImage rating location title address")
        .lean();
      res.sendJson(1, 200, "Halls Retrieved Succesfully", halls);
    } catch (err) {
      res.sendJson(1, 500, "Server error", err.message);
    }
  })
);

// PUT /halls/:id --update hall
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const hallId = req.params.id;
      const updatedHall = req.body;
      const hall = await Hall.findByIdAndUpdate(hallId, updatedHall, {
        new: true
      });
      if (!hall) {
        return res.status(404).send("Hall not found");
      }
      res.sendJson(1, 200, "Hall updated successfully", hall);
    } catch (err) {
      res.sendJson(1, 500, "Server error", err);
    }
  })
);

// GET /halls/:id --getByID --
router.get(
  "/get-specific-hall/:id",
  semi_auth,
  asyncHandler(async (req, res) => {
    const hallId = req.params.id;
    const userId = req?.user?._id;
    let isFavorite = false;
    if (userId) {
      const favoriteHallList = await FavoriteHall.find({userId: userId, hallId: hallId}).lean();
      if (!favoriteHallList || favoriteHallList?.length > 0) {
        isFavorite = true;
      }
    } else {
      isFavorite = false;
    }
    const randomHalls = await Hall.aggregate([{$sample: {size: 4}}, {$project: {_id: 1, title: 1, images: 1}}]);
    const hall = await Hall.findById(hallId)
      .select("images offer title desc isFav address location capacity  aminities meals socialMedia reviews contactNo bookingId booking")
      .populate({
        path: "aminities",
        select: "title price image offer",
        model: "Aminity" // Update the model name to match the registered model name
      })
      .populate({
        path: "meals",
        select: "title price image offer mealItems",
        model: "Meal"
      })
      .lean();
    if (!hall) {
      return res.sendJson(0, 404, "Not Found!", null);
    }
    hall.amenities = hall.amenities;
    delete hall.amenities;
    hall.isFav = isFavorite;
    hall.featureHalls = randomHalls;
    res.sendJson(1, 200, "Hall retrieved successfully", hall); // Change 'halls' to 'hall'
  })
);

// DELETE /halls/:id  --delete hall
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const hallId = req.params.id;
      const hall = await Hall.findByIdAndDelete(hallId);
      if (!hall) {
        res.sendJson(1, 200, "Hall not found", null);
      }
      res.sendJson(1, 200, "Hall deleted successfully", null);
    } catch (err) {
      res.sendJson(1, 500, "Server error", err);
    }
  })
);

//Mark as Favorite API
router.post(
  "/favorite",
  semi_auth,
  asyncHandler(async (req, res) => {
    const hallId = req.body.hallId;
    const userId = req.user._id;
    const {error} = validateFav({hallId, userId});
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    const isFavorite = req.body.isFavorite;
    if (isFavorite) {
      const favoriteHall = await FavoriteHall.find({hallId: hallId});
      if (!favoriteHall || favoriteHall?.length == 0) {
        const favHall = new FavoriteHall({
          hallId: hallId,
          userId: userId
        });
        await favHall.save();
        res.sendJson(1, 200, "Hall Mark as Favorite");
      } else {
        res.sendJson(1, 200, "Hall Mark as Favorite");
      }
    } else {
      // handle here unmark feature
      await FavoriteHall.findOneAndDelete({hallId: hallId});
      res.sendJson(1, 200, "Hall unmark as Favorite");
    }
  })
);

// get Favorite hall list
router.get(
  "/get-favorite",
  auth,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const favoriteHallList = await FavoriteHall.find({userId: userId}).populate({path: "hallId", select: "majorImage title address rating"}).select({_id: 0, userId: 0, __v: 0}).lean();
    const resList = _.compact(_.map(favoriteHallList, "hallId"));
    res.sendJson(1, 200, "Hall retrieved Successfully", resList);
  })
);
// get Favorite hall list
router.get(
  "/search",
  auth,
  asyncHandler(async (req, res) => {
    const search = req.query.search;
    const searchRegex = new RegExp(search, "i");
    const halls = await Hall.find({
      $or: [
        {title: {$regex: searchRegex}}, // Partial match on name
        {address: {$regex: searchRegex}} // Partial match on address
      ]
    })
      .select("majorImage rating location title address")
      .lean();
    res.sendJson(1, 200, "Hall retrieved Successfully", halls);
  })
);

//  this APi is just to update Field value to add EventType
router.get(
  "/update-hall",
  asyncHandler(async (req, res) => {
    try {
      const event = req.query.id;
      const hall = await Hall.updateMany(
        {},
        {
          $set: {
            eventType: [event]
          }
        }
      );
      res.sendJson(1, 200, "Hall updated successfully", hall);
    } catch (err) {
      res.sendJson(1, 500, "Server error", err);
    }
  })
);

router.get(
  "/get-hall-meals",
  asyncHandler(async (req, res) => {
    const hallId = req.query.id;
    const {error} = validateObjectId_(hallId);
    if (error) {
      res.sendJson(0, 500, "Server Error", null);
    }
    const meals = await Hall.findById(hallId)
      .select({_id: 0, hallId: "$_id"})
      .populate({
        path: "meals",
        select: "title price image offer mealItems addsOn details",
        model: "Meal"
      })
      .lean();
    res.sendJson(1, 200, "Hall updated successfully", meals);
  })
);
router.get(
  "/get-hall-aminities",
  asyncHandler(async (req, res) => {
    const hallId = req.query.id;
    const {error} = validateObjectId_(hallId);
    if (error) {
      res.sendJson(0, 500, "Server Error", null);
    }
    const aminities = await Hall.findById(hallId)
      .select({_id: 0, hallId: "$_id"})
      .populate({
        path: "aminities",
        select: "title price image offer package details addsOn _id",
        model: "Aminity"
      })
      .lean();

    res.sendJson(1, 200, "Aminities retreived successfully", aminities);
  })
);

module.exports = router;
