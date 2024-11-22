const express = require("express");
const router = express.Router();
const {Payment} = require("../model/payments");
const auth = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");

// GET specific user payment by id
// router.get("/:reviewId", async (req, res) => {
//   try {
//     const {reviewId} = req.params;
//     const hall = await Hall.findOne({"reviews._id": reviewId});
//     if (!hall) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found"
//       });
//     }
//     const review = hall.reviews.find(r => r._id.toString() === reviewId);
//     if (!review) {
//       return res.sendJson(1, 200, "Review not found", null);
//     }
//     return res.sendJson(1, 200, "Review retrieved succesfully", review);
//   } catch (error) {
//     return res.sendJson(1, 500, "An error occurred while retrieving the review", error.message);
//   }
// });

// get user payment list
router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
      const payment = await Payment.find({userId: userId})
        .populate({
          path: "bookingId",
          select: {date: 1, _id: 0, shift: 1},
          populate: {
            path: "hall",
            select: {_id: 0, title: 1}
          }
        })
        .lean();
      return res.sendJson(1, 200, "All payments retrieved successfully", payment);
    } catch (error) {
      return res.sendJson(1, 500, "An error occurred while retrieving the reviews", error.message);
    }
  })
);

module.exports = router;
