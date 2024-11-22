const express = require("express");
const router = express.Router();
const {Hall} = require("../model/hall");

// add reviews against specific hall
router.post("/:hallId", async (req, res) => {
  try {
    const {hallId} = req.params;
    const {userName, rating, details} = req.body;
    const hall = await Hall.findById(hallId).exec();
    if (!hall) {
      return res.sendJson(1, 200, "Hall not found", null);
    }
    const newReview = {
      userName,
      rating,
      details,
      date: new Date()
    };
    hall.reviews.push(newReview);
    await hall.save();
    return res.sendJson(1, 201, "Review Added Successfully", newReview);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the reviews",
      error: error.message
    });
  }
});

// GET one review by id
router.get("/:reviewId", async (req, res) => {
  try {
    const {reviewId} = req.params;
    const hall = await Hall.findOne({"reviews._id": reviewId});
    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }
    const review = hall.reviews.find(r => r._id.toString() === reviewId);
    if (!review) {
      return res.sendJson(1, 200, "Review not found", null);
    }
    return res.sendJson(1, 200, "Review retrieved succesfully", review);
  } catch (error) {
    return res.sendJson(1, 500, "An error occurred while retrieving the review", error.message);
  }
});

// DELETE review by review ID
router.delete("/:reviewId", async (req, res) => {
  try {
    const {reviewId} = req.params;
    const hall = await Hall.findOne({"reviews._id": reviewId});
    if (!hall) {
      return res.sendJson(1, 200, "Review not found", null);
    }
    const reviewIndex = hall.reviews.findIndex(r => r._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.sendJson(1, 200, "Review not found", null);
    }
    hall.reviews.splice(reviewIndex, 1);
    await hall.save();
    return res.sendJson(1, 200, "Review deleted succesfully", null);
  } catch (error) {
    return res.sendJson(1, 500, "An error occurred while deleting the review", error.message);
  }
});

// Update review by review ID
router.put("/:reviewId", async (req, res) => {
  try {
    const {reviewId} = req.params;
    const {userName, rating, details} = req.body;
    const hall = await Hall.findOne({"reviews._id": reviewId});
    if (!hall) {
      return res.sendJson(1, 200, "Review not found", null);
    }
    const review = hall.reviews.find(r => r._id.toString() === reviewId);
    if (!review) {
      return res.sendJson(1, 200, "Review not found", null);
    }
    review.userName = userName || review.userName;
    review.rating = rating || review.rating;
    review.details = details || review.details;
    await hall.save();
    return res.sendJson(1, 200, "Review updated found", review);
  } catch (error) {
    return res.sendJson(1, 500, "An error occurred while updating the review", error.message);
  }
});

// will help to get all the reviews from all the halls
router.get("/", async (req, res) => {
  try {
    const halls = await Hall.find();
    const reviews = halls.flatMap(hall => hall.reviews);
    return res.sendJson(1, 200, "All reviews retrieved successfully", reviews);
  } catch (error) {
    return res.sendJson(1, 500, "An error occurred while retrieving the reviews", error.message);
  }
});

//will help to get the review against specific hall
router.get("/hall/:hallId", async (req, res) => {
  try {
    const {hallId} = req.params;
    const hall = await Hall.findById(hallId);

    if (!hall) {
      return res.sendJson(1, 200, "Hall not found", null);
    }
    const reviews = hall.reviews;
    return res.sendJson(1, 200, "Reviews Retrieved Succesfully", reviews);
  } catch (error) {
    return res.sendJson(1, 500, "An error occurred while retrieving the reviews", null);
  }
});

module.exports = router;
