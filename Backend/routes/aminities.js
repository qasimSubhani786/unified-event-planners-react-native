const express = require("express");
const {validate, Aminity} = require("../model/aminities");
const {validateObjectId} = require("../model/validateObjId");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {initializeApp} = require("firebase/app");
const firebaseConfig = require("../config/firebase-config");
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
const multer = require("multer");
const router = express.Router();
const _ = require("lodash");
const {AddsOn} = require("../model/addsOn");

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});

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

//to create a new aminity object
router.post(
  "/",
  [auth, admin, upload.single("image")],
  asyncHandler(async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
      return res.status("404").send(error);
    }
    debugger;
    const storageRef = ref(storage, `aminity/${req.file.originalname + " " + getCurrentDateTime()}`);
    const metaData = {contentType: req.file.mimetype};
    // upload file in bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    let addsOn = [];
    // creating Addson and saving it into db
    for (let i = 0; i < req.body?.addsOn.length; i++) {
      const addsOnItem = req.body?.addsOn[i];
      let addon = new AddsOn({title: addsOnItem.title, price: addsOnItem.price});
      addsOn.push(addon);
      await addon.save();
    }
    let aminity = new Aminity(_.pick(req.body, ["title", "price", "offer", "package", "details"]));
    aminity.image = downloadUrl;
    aminity.addsOn = addsOn;
    aminity = await aminity.save();
    res.sendJson(1, 200, "Aminity added successfully", aminity);
  })
);

//to get Meals List
router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    let aminity = await Aminity.find().lean().select({title: 1, image: 1, price: 1, offer: 1, package: 1, addsOn: 1, _id: 1});
    res.sendJson(1, 200, "Aminities retrieved successfully", aminity); // here is generic Approach to handle Responses We will use this approach throughout the application
  })
);

// // update first Approach
router.get(
  "/get-aminity-byid/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = validateObjectId(req.params.id);
    let meal = await Aminity.findById(id ?? 0);
    if (!meal) {
      return res.sendJson(0, 404, "Not Found!", null);
    }
    res.sendJson(1, 200, "Aminity retrieved successfully", meal);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = validateObjectId(req.params.id);
    let result = await Aminity.findByIdAndRemove(id);
    if (result) {
      res.sendJson(1, 200, "Aminity deleted successfully", result);
    } else {
      res.sendJson(0, 404, "Dose not exist!", null);
    }
  })
);

module.exports = router;
