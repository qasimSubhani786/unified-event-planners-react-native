import {PreferencesKeys} from "./preferencesKeys";
import {storeValue, getValue, storeObject, getObject} from "./asyncStoragePreferences";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDiscovery = async discovery => {
  await storeObject(PreferencesKeys.ssoDiscovery, discovery);
};

export const saveAccessToken = async token => {
  await storeValue(PreferencesKeys.accessToken, token);
};
export const saveIdToken = async token => {
  await storeValue(PreferencesKeys.idToken, token);
};
export const saveUserDetails = async data => {
  await storeObject(PreferencesKeys.userDetails, data);
};

export const getSsoAuthConfig = async () => {
  let details = await getObject(PreferencesKeys.ssoAuthConfig);
  return details;
};

export const removeUserResume = async () => {
  await storeObject(PreferencesKeys.userResume, null);
};
export const getAccessToken = async () => {
  let accessToken = await getValue(PreferencesKeys.accessToken);
  return {
    accessToken: accessToken.value || ""
  };
};
export const getIdToken = async () => {
  let idToken = await getValue(PreferencesKeys.idToken);
  return {
    idToken: idToken.value || ""
  };
};

export const getAuthTokenDetails = async () => {
  let authToken = await getValue(PreferencesKeys.authToken);
  let bearerToken = authToken.value || "";
  return bearerToken;
};

export const getUserId = async () => {
  let userId = await getValue(PreferencesKeys.userId);
  return userId.value || "";
};

export const removeLoginSessionDetails = async () => {
  await storeValue(PreferencesKeys.accessToken, "");
  await storeValue(PreferencesKeys.idToken, "");
};

export const getNotificationFetchTime = async () => {
  return await AsyncStorage.getItem(PreferencesKeys.notificationGetTime);
};

export const getJopInfoSyncTime = async () => {
  return (await AsyncStorage.getItem(PreferencesKeys.jobInfoSyncTime)) || "";
};

export const setJobInfoSyncTime = async value => {
  await AsyncStorage.setItem(PreferencesKeys.jobInfoSyncTime, value);
};
export const getShiftDetail = async () => {
  var result = await AsyncStorage.getItem(PreferencesKeys.shiftDetail);
  return JSON.parse(result || "{}");
};
export const setNotificationFetchTime = async value => {
  await AsyncStorage.setItem("notificationGetTime", value);
};
