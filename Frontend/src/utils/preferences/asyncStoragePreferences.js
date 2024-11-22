import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
    return true;
  } catch (e) {
    return false;
  }
};
export const getValue = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return {
        value: value,
        error: null,
      };
    } else {
      return {
        value: null,
        error: 'Not Found',
      };
    }
  } catch (e) {
    return {
      value: null,
      error: 'Exception' + e,
    };
  }
};
export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.log('error in setting data', e);
    return false;
  }
};

export const getObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return {
      value: null,
      error: 'Exception' + e,
    };
  }
};
