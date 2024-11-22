import * as Yup from "yup";

export const SignupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Address") // for The Time it is commented out
    .required("Email is Requiured"),
  phone: Yup.string()
    .trim()
    .min(11, "Phone number must be at least 11 characters long")
    .matches(/^[0-9]+$/, "Enter valid numeric phone number")
    .required("Phone number is required"),
  cnic: Yup.string().trim().min(13).required("CNIC is Requiured"),
  password: Yup.string().trim().min(5).required("Password is required"),
});

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const locationSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area is required"),
});

export const forgetPassSchema = Yup.object().shape({
  phone: Yup.string()
  .trim()
  .min(11, "Phone number must be at least 11 characters long")
  .matches(/^[0-9]+$/, "Enter valid numeric phone number")
  .required("Phone number is required"),
});

export const UpdateProfileSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  name: Yup.string().trim().required("Name is required"),
  cnic: Yup.string().trim().min(13)
    .required("CNIC is Requiured"),
  phone: Yup.string().trim().required("Phone number is required").length(11, "Phone number length should be 11"),
});

export const ForgetResetPassSchema = Yup.object({
  password: Yup.string().trim().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password and Confirm Password not match!")
    .required("Confirm Password is Required"),});

export const ChangePasswordFormValidation = Yup.object({

  oldPassword: Yup.string().trim().required("Old Password is required"),
  newPassword: Yup.string().trim().required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Password and Confirm Password not match!")
    .required("Confirm Password is Required"),
});

export const guestCountSchema = (people) => {
  const schema = Yup.object({
    noOfPeople: Yup.number()
      .required("Number of people is required")
      .min(10, "Number of people must be at least 10")
      .max(people, `Number of people must not exceed ${people}`),
  });

  return schema;
};