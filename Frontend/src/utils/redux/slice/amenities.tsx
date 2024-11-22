import { createSlice } from "@reduxjs/toolkit";

export const amenitySlice = createSlice({
  name: "amenities",
  initialState: {
    selectedAmenities: [],
    amenityDetailsData: null,
    isAmenityDetailPopupOpens: false,
    aminity_package: "",
    amenityAdsOn: [],
    totalAmenityPrice: []
  },
  reducers: {
    setAmenityDetailsData: (state, { payload }) => {
      state.amenityDetailsData = payload;
    },
    setAminity_package: (state, { payload }) => {
      state.aminity_package = payload
    },
    setIsAmenityDetailPopupOpens: (state, { payload }) => {
      state.isAmenityDetailPopupOpens = payload;
    },
    setAmenityAdsOn: (state, { payload }) => {
      state.amenityAdsOn = payload;
    },
    setTotalAmenityPrice: (state, { payload }) => {
      const index = state.totalAmenityPrice.findIndex((item: any) => item.id == payload.id);
      if (index !== -1) {
        // Amenity ID exists, remove it from the array
        state.totalAmenityPrice.splice(index, 1);
      }
      // Amenity ID does not exist, add it to the array
      state.totalAmenityPrice.push(payload);
    },
    setSelectedAmenities: (state, { payload }) => {
      state.selectedAmenities.push(...payload)
    },
    toggleAmenity: (state, { payload }) => {
      const index = state.selectedAmenities.findIndex((item: any) => item.id == payload.id);
      if (index !== -1) {
        // Amenity ID exists, remove it from the array
        state.selectedAmenities.splice(index, 1);
        const totalIndex = state.totalAmenityPrice.findIndex((item: any) => item.id == payload.id)
        if (totalIndex != -1) {
          state.totalAmenityPrice.splice(totalIndex, 1)
        }
      } else {
        // Amenity ID does not exist, add it to the array
        state.selectedAmenities.push(payload);
      }
    },
    updateAmenityData: (state, { payload }) => {
      const item = state.selectedAmenities.find((item: any) => item.id == payload.id);
      const index = state.selectedAmenities.findIndex((item: any) => item.id == payload.id);
      if (item) {
        // Amenity ID exists, remove it from the array
        item.package = payload.package;
        item.price = payload.price
        item.addsOn = payload.addsOn
        state.selectedAmenities.splice(index, 1)
        state.selectedAmenities.push(item);

      } else {
        // Amenity ID does not exist, add it to the array
        state.selectedAmenities.push(payload);
      }
    },
    emptyAmenities: (state, { payload }) => {
      state.selectedAmenities = []
      state.amenityDetailsData = null
      state.isAmenityDetailPopupOpens = false
      state.aminity_package = ""
      state.amenityAdsOn = []
      state.totalAmenityPrice = []
    }
  }
});

export const { emptyAmenities, setAmenityAdsOn, setTotalAmenityPrice, updateAmenityData, setAminity_package, setSelectedAmenities, toggleAmenity, setAmenityDetailsData, setIsAmenityDetailPopupOpens } = amenitySlice.actions;
