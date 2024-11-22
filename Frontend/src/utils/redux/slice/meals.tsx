import { createSlice } from "@reduxjs/toolkit";

export const mealSlice = createSlice({
  name: "meals",
  initialState: {
    selectedMealId: "",
    selectedMealItems: [],
    selectedMealAdsOn: [],
    selectedAdsOnIds: [],
    menuDetailsData: null,
    isMenuDetailPopupOpens: false,
  },
  reducers: {
    setSelectedMealId: (state, { payload }) => {
      state.selectedMealId = payload;
    },
    setSelectedMealItems: (state, { payload }) => {
      state.selectedMealItems.length = 0
      state.selectedMealItems.push(...payload)
    },
    setSelectedMealAdsOn: (state, { payload }) => {
      state.selectedMealAdsOn = payload;
    },
    setSelectedAdsOnIds: (state, { payload }) => {
      state.selectedAdsOnIds = payload;
    },
    toggleMealSelectedIds: (state, { payload }) => {
      const items = payload?.items
      const newMealId = payload?.id
      const filteredArr1 = state?.selectedMealItems?.filter((value) => !items.includes(value));
      filteredArr1?.push(newMealId)
      state.selectedMealItems = filteredArr1;
    },
    setMenuDetailsData: (state, { payload }) => {
      state.menuDetailsData = payload;
    },
    setIsMenuDetailPopupOpens: (state, { payload }) => {
      state.isMenuDetailPopupOpens = payload;
    },
    emptyMeals: (state, { payload }) => {
      state.selectedMealId = ""
      state.selectedMealItems = []
      state.selectedMealAdsOn = []
      state.selectedAdsOnIds = []
      state.menuDetailsData = null
      state.isMenuDetailPopupOpens = false
    },
  }
});

export const { emptyMeals, setSelectedAdsOnIds, setSelectedMealId, setSelectedMealItems, setSelectedMealAdsOn, setMenuDetailsData, setIsMenuDetailPopupOpens, toggleMealSelectedIds } = mealSlice.actions;
