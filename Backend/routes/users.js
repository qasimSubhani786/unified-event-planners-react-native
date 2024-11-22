const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const twilio = require("twilio");

// Twilio credentials
const accountSid = process.env.TIWILLIO_SID;
const authToken = process.env.TIWILLIO_AUTHTOKEN;
const twilioPhoneNumber = "+14172177388";

function formatPhoneNumber(phoneNumber) {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
  if (numericPhoneNumber.startsWith("0")) {
    return "+92" + numericPhoneNumber.substr(1);
  }
  return numericPhoneNumber; // No changes needed
}
const client = twilio(accountSid, authToken);

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

//to create a new user object
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.sendJson(0, 200, "User Alraedy Exist!", null);
    }
    user = new User(
      _.pick(req.body, [
        "name",
        "email",
        "cnic",
        "password",
        "isAdmin",
        "phone",
      ])
    );
    const salt = await bcrypt.genSalt(10); // create a salt and send and save it to db
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken({
      name: user.name,
      email: user.email,
    });
    user.token = token;
    res.sendJson(
      1,
      200,
      "User Created Successfully ",
      _.pick(user, ["name", "email", "_id", "token"])
    );
  })
);

//to create a new user object
router.post(
  "/request-forgot-password",
  asyncHandler(async (req, res) => {
    const phone = req.body.phone;
    if (!phone) {
      return res.sendJson(0, 404, "Please Send Your Phone Number", null);
    }
    let user = await User.findOne({ phone: phone });
    if (user) {
      const otp = generateOTP();
      const updatedOtp = await User.updateOne(
        { _id: user._id },
        {
          $set: {
            otp: otp,
          },
        }
      );
      let sendMessage = await client.messages.create({
        body: `Your Forgot Password Otp is ${otp} for Unified Event Planners`,
        from: twilioPhoneNumber,
        to: formatPhoneNumber(phone),
      });
      return res.sendJson(
        1,
        200,
        "Otp has been send to your phone Number",
        null
      );
    } else {
      return res.sendJson(0, 200, "User not Found!", null);
    }
  })
);
//to create a new user object
router.post(
  "/verify-forgot-otp",
  asyncHandler(async (req, res) => {
    const otp = req.body.otp;
    const phone = req.body.phone;
    if (!otp || !phone) {
      return res.sendJson(0, 404, "Please Send Your Details Correctly", null);
    }
    let user = await User.findOne({ phone: phone }).lean();
    if (user) {
      if (user.otp == otp) {
        return res.sendJson(1, 200, "Otp Verified Successfully", null);
      } else {
        return res.sendJson(0, 200, "Wrong Otp!", null);
      }
    } else {
      return res.sendJson(0, 200, "User not Found!", null);
    }
  })
);

//to create a new user object
router.post(
  "/update-forgot-password",
  asyncHandler(async (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    if (!phone || !password) {
      return res.sendJson(0, 404, "Please Send Your Details Correctly", null);
    }
    let user = await User.findOne({ phone: phone });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const updatedOtp = await User.updateOne(
        { phone: phone },
        {
          $set: {
            password: newPassword,
          },
        }
      );
      return res.sendJson(1, 200, "Password has been updated", null);
    } else {
      return res.sendJson(0, 200, "User not Found!", null);
    }
  })
);

// get userinfo
router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (user) {
      res.sendJson(
        1,
        200,
        "User data found",
        _.pick(user, ["name", "email", "_id", "cnic", "phone"])
      );
    } else {
      res.sendJson(0, 200, "User data not found", null);
    }
  })
);
// get userinfo
router.post(
  "/update-user-info",
  auth,
  asyncHandler(async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (user) {
      let updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            phone: req.body.phone,
            name: req.body.name,
            cnic: req.body.cnic,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        res.sendJson(1, 200, "User data updated", updatedUser);
      }
    } else {
      res.sendJson(0, 200, "User data not found", null);
    }
  })
);

router.post(
  "/change-password",
  auth,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    if (!newPassword || !oldPassword) {
      return res.sendJson(0, 400, "Password must be provided", null);
    }
    let user = await User.findOne({ _id: userId });
    if (user) {
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.sendJson(
          0,
          400,
          "Invalid old password Please Add correct one",
          null
        );
      }
      const salt = await bcrypt.genSalt(10);
      const newPasswordSalt = await bcrypt.hash(newPassword, salt);
      const updatedOtp = await User.updateOne(
        { _id: userId },
        {
          $set: {
            password: newPasswordSalt,
          },
        }
      );
      return res.sendJson(
        1,
        200,
        "Password has been updated successfully",
        null
      );
    } else {
      res.sendJson(0, 200, "User data not found", null);
    }
  })
);

// get users
router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.find().select("_id name email cnic isAdmin").lean();
    res.sendJson(1, 200, "User Retrieved Succesfully", user);
  })
);

module.exports = router;
