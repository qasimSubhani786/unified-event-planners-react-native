import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { styles } from "./style";
import { Button, Header, ScreenLoader } from "../../components";
import { colors, fontFamily } from "../../common";
import CalendarPicker from "react-native-calendar-picker";
import { RadioButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useCheckAvailabilityMutation } from "../../utils/redux/slice/emptySplitApi";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { AntDesign } from "@expo/vector-icons";
import { textStyle } from "../hall-detail/styles";
import { setSelectedDate } from "../../utils/redux/slice/check-availability";

const CheckAvailability = ({ route }) => {
  const navigation = useNavigation<StackNavigation>();

  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [slotsData, setSlotsData] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(-1); // Initialize with -1 to indicate no selection
  const today = new Date(); // Today
  const date2 = new Date(today);
  const dayAfterTomorrow = date2.setDate(today.getDate() + 1);
  const [availableHalls, availableHallsResponse] =
    useCheckAvailabilityMutation();
  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const selectHallDateHandler = async () => {
    try {
      const selectedHall = slotsData[selectedSlotIndex];
      dispatch(setSelectedDate(selectedHall));
      navigation.goBack();
    } catch (error) { }
  };

  const showDate = async () => {
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    setSlotsData([]);
    const selectDatePayload = {
      hallId: route?.params?.hallId,
      toDate: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(start.getDate()).padStart(2, "0")}`,
      fromDate: `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(end.getDate()).padStart(2, "0")}`,
    };
    const response: any = await availableHalls(selectDatePayload);
    if (response && response.data.success) {
      setSlotsData(response.data.data);
    }
  };

  const formatTime = (dateTimeString) => {
    const temp = new Date(dateTimeString);
    return `${temp.getFullYear()}-${String(temp.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(temp.getDate()).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={() => {
          navigation.goBack();
        }}
        text={"Check Availability"}
        backIcon={true}
      />
      <View style={styles.titleContainer}>
        <Text style={textStyle(colors.black, fontFamily.tommyMedium, 16).text}>
          Please choose a booking date. Select start and end dates to explore
          our exquisite venue options.{" "}
        </Text>
      </View>
      <ScrollView
        style={styles.subContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.calenderContainer}>
            <View>
              <CalendarPicker
                allowRangeSelection={true}
                selectedDayColor={colors.blue6}
                selectedDayTextColor={colors.white}
                onDateChange={onDateChange}
                todayBackgroundColor={colors.white}
                minDate={dayAfterTomorrow}
                headerWrapperStyle={{
                  width: Dimensions.get("window").width - 50,
                }}
                width={Dimensions.get("window").width - 10}
                nextComponent={
                  <AntDesign
                    name="rightcircle"
                    size={30}
                    color={colors.primary}
                  />
                }
                previousComponent={
                  <AntDesign
                    name="leftcircle"
                    size={30}
                    color={colors.primary}
                  />
                }
              />
              <View style={styles.chkContainer}>
                <Button
                  text={"Check"}
                  customStyle={styles.chkbtn}
                  onPress={showDate}
                  isDisable={
                    selectedStartDate === null || selectedEndDate === null
                  }
                  loader={availableHallsResponse.isLoading}
                />
              </View>
            </View>
          </View>

          <View>
            {(slotsData.length > 0) && (
              <Text style={styles.availabilityText}>Available Slots</Text>
            )}
            {false ? (
              <ScreenLoader />
            ) : slotsData.length == 0 ? (
              <Text style={styles.noVenue}>
                {slotsData.length == 0
                  ? ` ${availableHallsResponse.data
                    ? "No Venue available against the selected dates"
                    : ""
                  } `
                  : ""}
              </Text>
            ) : (
              slotsData.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.itemContaienr,
                    selectedSlotIndex === index && styles.seletecdItemBk, // Apply selected style if the slot is selected
                  ]}
                  onPress={() => setSelectedSlotIndex(index)}
                >
                  <View style={styles.contentContainer}>
                    <View style={styles.radioContainer}>
                      <RadioButton.Android
                        onPress={() => setSelectedSlotIndex(index)}
                        value={index.toString()} // Assuming each slot has a unique identifier
                        status={
                          selectedSlotIndex === index ? "checked" : "unchecked"
                        }
                        color={colors.primary}
                      />
                    </View>
                    <View style={styles.otherContainer}>
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateTxt}>Date: </Text>
                        <Text style={styles.date}>{formatTime(slot.date)}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Text style={styles.timeTxt}>Available Time: </Text>
                        <Text style={styles.time}>{slot.time}</Text>
                      </View>
                      <View style={styles.status}>
                        {slot.shift == "morning" && (
                          <Text style={styles.statusTxt}>{slot.shift}</Text>
                        )}
                        {slot.shift == "evening" && (
                          <Text style={styles.statusOranger}>{slot.shift}</Text>
                        )}
                        {slot.shift == "night" && (
                          <Text style={styles.statusRed}>{slot.shift}</Text>
                        )}
                      </View>
                      {slot.discount && (
                        <View style={styles.discount}>
                          <Text style={styles.discountTxt}>
                            {slot.discount}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.contBtn}>
        <Button
          isDisable={selectedSlotIndex == -1}
          text={"Continue"}
          onPress={selectHallDateHandler}
        />
      </View>
    </SafeAreaView>
  );
};
export default CheckAvailability;
