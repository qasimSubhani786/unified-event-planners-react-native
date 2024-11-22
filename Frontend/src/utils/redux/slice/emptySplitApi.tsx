import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./url";
import { selectToken } from "../reducer/mainSlice";

const endPoints = {
  home: "/home",
  highlights: "/highlights",
  user: "/user",
  getCurrentUser: "/user/me",
  events: "/events",
  hallDetails: "/halls/get-specific-hall/",
  markFavUnFavorite: "/halls/favorite",
  hallsByEvent: `/halls?event=`,
  hallsSearch: `/halls/search?search=`,
  hallMeals: `/halls/get-hall-meals`,
  hallAminity: `/halls/get-hall-aminities`,
  addBooking: `/booking/add-booking`,
  getBookingConfirmation: `/booking/confirm-booking?isConfirmationScreen=true`,
  checAvailability: `/booking/check-availability`,
  addReview: `/reviews`,
  confirmBooking: `/booking/confirm-booking`,
  paymentSheet: `/booking/payment-sheet`,
  updateBookingStatus: `/booking/update-booking-status`,
  getBookings: `/booking`,
  getFavouriteHalls: `/halls/get-favorite`,
  changePassword: `/user/change-password`,
  updateProfile: `/user//update-user-info`,
  getReviewsAgainstHall: `/reviews/hall/`,
  reqForgetPass: `/user/request-forgot-password`,
  verifyOtp: `/user/verify-forgot-otp`,
  updateForgorPassword: `/user/update-forgot-password`,
  deleteBooking: `/booking/delete-booking?bookingId=`,
  payment: `/payments`
};

// Define a service using a base URL and expected endpoints
export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // custom redux toolkit query header
    prepareHeaders: async (headers, { getState }) => {
      try {
        const token = selectToken(getState());
        if (token) {
          headers.set("x-auth-token", `${token}`);
        } else {
          headers.set("x-auth-token", "");
        }
      } catch (err) {
        headers.set("x-auth-token", "");
      }
      return headers;
    },
  }),
  // just for testing
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/home/`,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/auth`,
        method: "POST",
        body: body,
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: endPoints.user,
        method: "POST",
        body: body,
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: endPoints.updateProfile,
        method: "POST",
        body: body,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: endPoints.verifyOtp,
        method: "POST",
        body: body,
      }),
    }),

    updateForgotPassword: builder.mutation({
      query: (body) => ({
        url: endPoints.updateForgorPassword,
        method: "POST",
        body: body,
      }),
    }),
    getHighlights: builder.query({
      query: () => endPoints.highlights,
    }),
    getHallReviews: builder.query({
      query: (id) => `${endPoints.getReviewsAgainstHall}${id}`,
    }),
    getFavouriteHalls: builder.query({
      query: () => endPoints.getFavouriteHalls,
    }),
    getCurrentUser: builder.query({
      query: () => endPoints.getCurrentUser,
    }),
    getPayments: builder.query({
      query: () => endPoints.payment
    }),

    chnagePassword: builder.mutation({
      query: (body) => ({
        url: endPoints.changePassword,
        method: "POST",
        body: body,
      }),
    }),

    reqForgetPass: builder.mutation({
      query: (body) => ({
        url: endPoints.reqForgetPass,
        method: "POST",
        body: body,
      }),
    }),
    getEvents: builder.query({
      query: () => endPoints.events,
    }),
    hallsSearch: builder.query({
      query: (key) => `${endPoints.hallsSearch}${key}`,
    }),
    deleteBooking: builder.mutation({
      query: (eventId) => ({
        url: `${endPoints.deleteBooking}${eventId}`,
        method: "DELETE",
      }),
    }),
    getHallDetails: builder.query({
      query: (id) => `${endPoints.hallDetails}${id}`,
    }),
    hallsByEvent: builder.query({
      query: (eventId) => `${endPoints.hallsByEvent}${eventId}`,
    }),
    markHallasFavorite: builder.mutation({
      query: (body) => ({
        url: `${endPoints.markFavUnFavorite}`,
        method: "POST",
        body: body,
      }),
    }),
    getHallMeals: builder.query({
      query: (id) => ({ url: `${endPoints.hallMeals}?id=${id}` }),
    }),
    getHallAmenity: builder.query({
      query: (id) => ({ url: `${endPoints.hallAminity}?id=${id}` }),
    }),
    updateBookoingStatus: builder.query({
      query: (id) => ({
        url: `${endPoints.updateBookingStatus}?bookingId=${id}`,
      }),
    }),
    addHallBooking: builder.mutation({
      query: (body) => ({
        url: `${endPoints.addBooking}`,
        method: "POST",
        body: body,
      }),
    }),
    getBookingConfirmation: builder.mutation({
      query: (body) => ({
        url: `${endPoints.getBookingConfirmation}`,
        method: "POST",
        body: body,
      }),
    }),

    confirmHallBooking: builder.mutation({
      query: (body) => ({
        url: `${endPoints.confirmBooking}`,
        method: "POST",
        body: body,
      }),
    }),
    paymentSheet: builder.mutation({
      query: (body) => ({
        url: `${endPoints.paymentSheet}`,
        method: "POST",
        body: body,
      }),
    }),
    checkAvailability: builder.mutation({
      query: (body) => ({
        url: `${endPoints.checAvailability}`,
        method: "POST",
        body: body,
      }),
    }),

    addReviews: builder.mutation({
      query: ({ body, id }) => ({
        url: `${endPoints.addReview}/${id}`, // Assuming your `endPoints.addReview` is already the base URL
        method: "POST",
        body: body,
      }),
    }),

    getBookings: builder.query({
      query: () => endPoints.getBookings,
    }),
  }),

  // tag use for invalidate api
  tagTypes: [],
});

export const {
  useLazyGetUserQuery,
  useLazyHallsByEventQuery,
  useLoginMutation,
  useSignUpMutation,
  useLazyGetHighlightsQuery,
  useLazyGetEventsQuery,
  useLazyGetHallDetailsQuery,
  useMarkHallasFavoriteMutation,
  useLazyGetHallMealsQuery,
  useLazyGetHallAmenityQuery,
  useAddHallBookingMutation,
  useGetBookingConfirmationMutation,
  useCheckAvailabilityMutation,
  useAddReviewsMutation,
  useConfirmHallBookingMutation,
  usePaymentSheetMutation,
  useLazyGetBookingsQuery,
  useLazyHallsSearchQuery,
  useLazyGetFavouriteHallsQuery,
  useLazyUpdateBookoingStatusQuery,
  useChnagePasswordMutation,
  useUpdateProfileMutation,
  useLazyGetCurrentUserQuery,
  useLazyGetHallReviewsQuery,
  useReqForgetPassMutation,
  useVerifyOtpMutation,
  useUpdateForgotPasswordMutation,
  useDeleteBookingMutation,
  useLazyGetPaymentsQuery
} = emptySplitApi;
