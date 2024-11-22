const express = require("express");
const {validate, Events} = require("../model/event");
const {validateObjectId} = require("../model/validateObjId");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {initializeApp} = require("firebase/app");
const firebaseConfig = require("../config/firebase-config");
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
const multer = require("multer");
const router = express.Router();

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

// this API is just for image upload to Cloud server
router.post(
  "/upload-image",
  upload.single("fileName"),
  asyncHandler(async (req, res) => {
    const storageRef = ref(storage, `files/${req.file.originalname}`);
    const metaData = {contentType: req.file.mimetype};
    // upload file in bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    res.sendJson(1, 200, "Image Uploaded successfully", downloadUrl); // here is generic Approach to handle Responses We will use this approach throughout the application
  })
);

//to create a new event object
router.post(
  "/",
  [auth, admin, upload.single("image")],
  asyncHandler(async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
      return res.status("404").send(error);
    }
    const storageRef = ref(storage, `events/${req.file.originalname + " " + getCurrentDateTime()}`);
    const metaData = {contentType: req.file.mimetype};
    // upload file in bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    let event = new Events({
      title: req.body.title,
      image: downloadUrl
    });
    event = await event.save();
    res.status(200).send(event);
  })
);

//to get Courses List
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let events = await Events.find().lean().select({title: 1, image: 1, _id: 1});
    res.sendJson(1, 200, "Events retrieved successfully", events); // here is generic Approach to handle Responses We will use this approach throughout the application
  })
);

// // update first Approach
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const id = validateObjectId(req.params.id);

    const {error} = validate(req.body);
    if (error) {
      return res.status("404").send(error);
    }
    let events = await Events.findById(id ?? 0);
    if (!events) {
      return res.status(404).send({title: "Not found!"});
    }
    events.set(req.body);
    const result = await events.save();
    res.status(200).send(result);
  })
);

// Find By Id and Update
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = validateObjectId(req.params.id);

    const {error} = validate(req.body);
    if (error) {
      return res.status("404").send(error);
    }
    let result = await Events.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title
        }
      },
      {new: true}
    );

    res.status(200).send(result);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = validateObjectId(req.params.id);
    let result = await Events.findByIdAndRemove(id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({type: "Error", success: false, message: "Dose not exist!"});
    }
  })
);

module.exports = router;
