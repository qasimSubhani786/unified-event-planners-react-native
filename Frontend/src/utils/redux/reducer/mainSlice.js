import {createSlice} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [""]
};

const initialState = {
  user: null,
  location: null
};

export const mainSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setLocation: (state, actions) => {
      state.location = actions.payload;
    }
  }
});

export const {setUser} = mainSlice.actions;
export const {setLocation} = mainSlice.actions;

export const selectToken = state => state.auth.user.token;

export default mainReducer = persistReducer(persistConfig, mainSlice.reducer);
