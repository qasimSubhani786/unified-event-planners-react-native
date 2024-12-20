import {configureStore} from "@reduxjs/toolkit";
// import { api } from './slice/api'
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import {emptySplitApi} from "./slice/emptySplitApi";
import {modalSlice} from "./slice/popup-modal";
import mainSlice from "./reducer/mainSlice";
import {mealSlice} from "./slice/meals.tsx";
import {amenitySlice} from "./slice/amenities";
import {availability} from "./slice/check-availability";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice,
    auth: mainSlice,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    modal: modalSlice.reducer,
    meals: mealSlice.reducer,
    amenities: amenitySlice.reducer,
    hallAvailability: availability.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(emptySplitApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
export const persistor = persistStore(store);
