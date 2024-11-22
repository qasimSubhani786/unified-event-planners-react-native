import {createSlice} from "@reduxjs/toolkit";

export const availability = createSlice({
  name: "hallAvailability",
  initialState: {
    selectedDate: null
  },
  reducers: {
    setSelectedDate: (state, {payload}) => {
      state.selectedDate = payload;
    }
  }
});

export const {setSelectedDate} = availability.actions;
