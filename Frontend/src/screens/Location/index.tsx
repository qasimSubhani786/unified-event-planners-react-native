import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Header } from "../../components";
import { styles } from "./style";
import { ALL_TEXTS, colors, fontFamily, fontSize } from "../../common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { useDispatch } from "react-redux";
import { setLocation } from "../../utils/redux/reducer/mainSlice";

const Location = ({ route }) => {
  const navigation = useNavigation<StackNavigation>();
  const { eventId } = route.params || {};

  const [isCityOpen, setCityOpen] = useState(false);
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState([]);
  const [isAreaError, setAreaError] = useState(false);
  const [isCityError, setCityError] = useState(false);

  const [cities, setCities] = useState([
    { label: "Lahore", value: "lahore" },
    { label: "Karachi", value: "karachi" },
    { label: "Islamabad", value: "islamabad" },
  ]);
  const dispatch = useDispatch();

  const areasData = {
    lahore: [
      { label: "Gulberg", value: "gulberg" },
      { label: "Johar Town", value: "johar town" },
      { label: "DHA", value: "dha" },
      { label: "Model Town", value: "model town" },
      { label: "Garden Town", value: "garden town" },
      { label: "Township", value: "township" },
      { label: "Gulshan-e-Ravi", value: "gulshan e ravi" },
    ],
    karachi: [
      { label: "Clifton", value: "clifton" },
      { label: "Gulshan-e-Iqbal", value: "gulshan e iqbal" },
      { label: "Defence", value: "defence" },
      { label: "North Nazimabad", value: "north nazimabad" },
      { label: "Saddar", value: "saddar" },
      { label: "Malir", value: "malir" },
      { label: "Gulistan-e-Johar", value: "gulistan e johar" },
    ],
    islamabad: [
      { label: "F-6", value: "F-6" },
      { label: "G-9", value: "G-9" },
      { label: "E-11", value: "E-11" },
      { label: "G-5", value: "G-5" },
      { label: "I-8", value: "I-8" },
      { label: "H-8", value: "H-8" },
      { label: "G-11", value: "G-11" },
    ],
  };

  const saveDataToLocalStorage = async () => {
    try {
      if (city && area) {
        await AsyncStorage.setItem("city", city);
        await AsyncStorage.setItem("area", area);
        dispatch(setLocation(city + ", " + area));
        navigation?.replace(ALL_TEXTS.SCREEN_NAME.VENUES, { eventId: eventId });
      }
      if (!city) {
        setCityError(true);
      }
      if (!area) {
        setAreaError(true);
      }
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  };

  const onSkip = () => {
    navigation.replace(ALL_TEXTS.SCREEN_NAME.VENUES, { eventId: eventId });
  }
  const handleAreaChange = (areaValue) => {
    setArea(areaValue);
    setAreaOpen(false);
    setAreaError(false);
  };

  useEffect(() => {
    getSavedData();
  }, []);

  useEffect(() => {
    if (city) {
      setAreas(areasData[city] || []);
    }
  }, [city]);

  const getSavedData = async () => {
    let city = await AsyncStorage.getItem("city");
    let area = await AsyncStorage.getItem("area");

    if (area && city) {
      setArea(area);
      setCity(city);
    }
  };

  const handleCityChange = (cityValue) => {
    if (isCityOpen) {
      setAreaOpen(false);
    }
    if (cityValue() === city) {
      setCityOpen(!isCityOpen);
    } else {
      setCity(cityValue());

      setArea(null);
      setAreas(areasData[cityValue] || []);
    }
    setAreaOpen(false);
    setAreaError(false);
  };

  return (
    <SafeAreaView style={styles.majorContainer}>
      <Header
        onBackPress={() => navigation.goBack()}
        backIcon
        text={ALL_TEXTS.HEADINGS.location}
      />
      <Text
        style={styles.nearby}
      >
        Discover Nearby Venues
      </Text>
      <View style={styles.container}>
        <View style={styles.dropdownContainer1}>
          <Text style={styles.text}>City</Text>
          <DropDownPicker
            style={styles.dropDown}
            open={isCityOpen}
            value={city}
            items={cities}
            setOpen={setCityOpen}
            placeholder={ALL_TEXTS.PLACEH_HOLDER.location.city}
            setValue={handleCityChange}
            setItems={setCities}
          />
        </View>
        {!isCityOpen && isCityError && !city ? (
          <View>
            <Text style={styles.errorText}>Please Select City First</Text>
          </View>
        ) : (
          <View></View>
        )}
        <View style={styles.dropdownContainer}>
          <Text style={styles.text}>Area</Text>
          <DropDownPicker
            style={styles.dropDown}
            open={isAreaOpen}
            value={area}
            items={areas}
            setOpen={setAreaOpen}
            setValue={handleAreaChange}
            setItems={setAreas}
            placeholder={ALL_TEXTS.PLACEH_HOLDER.location.area}
          />
          {!isAreaOpen && isAreaError && !area && (
            <View>
              <Text style={styles.errorText}>Please Select Area First</Text>
            </View>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity >
            <Button
              text={ALL_TEXTS.BUTTON_TEXT.Location}
              onPress={saveDataToLocalStorage}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.skip} onPress={onSkip}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default Location;
