import React, { useEffect, useState } from "react";
import { Button, Header, ScreenLoader } from "../../components";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  Alert,
  ToastAndroid,
} from "react-native";
import { styles } from "./style";
import { Call, Delete, Location, Payment2, ViewSvg } from "../../utils/svgs";
import {
  useDeleteBookingMutation,
  useLazyGetBookingsQuery,
} from "../../utils/redux/slice/emptySplitApi";
import { useSelector } from "react-redux";
import { LoginRequiredComponent } from "../Profile";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ALL_TEXTS } from "../../common";
import NotAvailable from "../../components/not-available";
import DropDownPicker from "react-native-dropdown-picker";

const Bookings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [filterText, setfilterText] = useState("all");
  const [isFilterOpens, setIsFilterOpens] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [getBookings, bookingResponse] = useLazyGetBookingsQuery();
  const userInfo = useSelector((state: any) => state?.auth?.user);
  let bookingData = bookingResponse.data?.data || [];

  const [refresing, setRefresing] = useState(false);

  function reverse_(array) {
    return array.map((item, idx) => array[array.length - 1 - idx]);
  }


  useEffect(() => {
    userInfo && getUserBookings();
  }, [refresing, isFocused]);

  const getUserBookings = async () => {
    let res=await getBookings(null);
    setRefresing(false);
  };

  useEffect(() => {
    if (filterText != null && filterText != "all") {
      const bookingFilter = bookingData.filter((i) => i.status === filterText);
      setFilteredBookings(bookingFilter);
    } else if (filterText == "all" || !filterText) {
      setFilteredBookings(bookingData);
    }
  }, [filterText, bookingResponse]);

  return (
    <SafeAreaView style={styles.container}>
      <Header text={"Bookings"} />
      {!userInfo ? (
        <LoginRequiredComponent
          text={"Unlock Bookings Section by Logging In"}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ flex: 0, borderWidth: 0, flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresing}
              onRefresh={() => {
                setRefresing(true);
              }}
            />
          }
        >
          {bookingResponse.isFetching ? (
            <View style={styles.loaderContainer}>
              <ScreenLoader />
            </View>
          ) : bookingData.length === 0 ? (
            <View>
              <NotAvailable
                customStyle={{ marginTop: 250 }}
                text={"There is no Currently Active Bookings"}
              />
              <Button
                onPress={() => {
                  navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME);
                }}
                customStyle={{ width: "50%", alignSelf: "center" }}
                text={"Book an Event"}
              />
            </View>
          ) : bookingData.length === 0 ? (
            <View>
              <NotAvailable
                customStyle={{ marginTop: 250, flex: 0 }}
                text={"There is no Currently Active Bookings"}
              />
              <Button
                onPress={() => {
                  navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME);
                }}
                customStyle={{ width: "50%", alignSelf: "center" }}
                text={"Book an Event"}
              />
            </View>
          ) : (
            <>
              <View style={styles.headContainer}>
                <Text style={styles.activeBooking}>Active Bookings</Text>
                <Text style={styles.desc}>
                  (View your all booking go to your booking history)
                </Text>
              </View>
              <View style={styles.dropdownContainer1}>
                <Text style={styles.text}>Filter Bookings</Text>
                <DropDownPicker
                  style={styles.dropDown}
                  open={isFilterOpens}
                  value={filterText}
                  items={[
                    { label: "Pending", value: "pending" },
                    { label: "Booked", value: "booked" },
                    { label: "Occupied", value: "occupied" },
                    { label: "All", value: "all" },

                  ]}
                  setOpen={setIsFilterOpens}
                  placeholder={"Filter Bookings"}
                  setValue={setfilterText}
                  setItems={(e) => {
                    console.log("set Items", e)

                  }}
                />
              </View>
              {
                filteredBookings.length == 0 ? (
                  <NotAvailable text={'No Bookings Available'} />
                ) :
                  (reverse_(filteredBookings).map((booking: any) => (
                    <BookingItem key={booking._id} booking={booking}
                      onPaynowBtnPress={() => {
                        navigation.navigate(ALL_TEXTS.SCREEN_NAME.CONFIRMATION_SCREEN, {
                          bookingId: booking.bookingId
                        })
                      }}
                      onDeleteBookingItem={() => getUserBookings()}
                    />
                  ))
                  )}
            </>
          )}
        </ScrollView>)}
    </SafeAreaView >
  );
};

const BookingItem = ({ booking, onPaynowBtnPress, onDeleteBookingItem }) => {
  const bookingStatus = {
    booked: "Booked",
    pending: "Pending",
    completed: "Completed",
  };
  const isOccupied = !booking.isActive && booking.status == "pending";
  const formatTime = (dateTimeString) => {
    const temp = new Date(dateTimeString);
    return `${temp.getFullYear()}-${String(temp.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(temp.getDate()).padStart(2, "0")}`;
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];
    return dayName;
  };
  const [deleteBookingApi, deleteBookingRes] = useDeleteBookingMutation();

  const sendInvite = async (booking) => {

    try {
      const coordinates = `${booking.hall.location[0]},${booking.hall.location[1]}`;
      const mapUrl = `https://www.google.com/maps/place/${coordinates}`;

      const message = encodeURIComponent(`We are delighted to invite you to the venue ${booking?.hall?.title} on date ${formatTime(booking?.date)} at ${booking?.shift}. Click the link below to view the location on Google Maps:\n${mapUrl}`);
      const whatsappUrl = `whatsapp://send?text=${message}`;

      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.log('Error opening WhatsApp:', error);
    }
  };

  const deleteBooking = (booking) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete the booking?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            let id = booking.bookingId;
            let res = await deleteBookingApi(booking.bookingId);
            if (res && res.data.success) {
              ToastAndroid.show(
                "Booking has been Deleted Succesfully",
                ToastAndroid.SHORT
              );
              onDeleteBookingItem(id);
            }

            // Perform the actual delete action here
            // Call your deleteBooking mutation or API endpoint
            // You can use the 'booking' parameter here
          },
        },
      ]
    );
  };
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemRow1Container}>
        <Text style={styles.listTitle}>{booking?.hall?.title}</Text>
        <View style={styles.elispeConfirmContainer}>
          {isOccupied ? (
            <View style={[styles.elipse, styles.orangeElipsed]}></View>
          ) : (
            <View
              style={[
                styles.elipse,
                booking.status === "booked" ? styles.blueElipse : null,
                booking.status === "pending" ? styles.yellowElipsed : null,
                booking.status === "completed" ? styles.greenElipsed : null,
              ]}
            ></View>
          )}
          <Text style={styles.confirmText}>
            {isOccupied ? "Occupied" : bookingStatus[booking.status]}
          </Text>
        </View>
      </View>
      <View style={styles.listItemRow2Container}>
        <View style={styles.locationContainer}>
          <Location height={20} width={20} />
          <Text style={styles.locationText}>{booking?.hall?.address}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${booking?.hall?.contactNo}`)}
          >
            <Call height={30} width={30} style={styles.edit} />
          </TouchableOpacity>
          {booking.status == "pending" && (
            <TouchableOpacity onPress={() => deleteBooking(booking)}>
              <Delete height={30} width={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateTxt}>Date: </Text>
        <Text style={styles.date}>
          {formatTime(booking.date) + " "}
          {getDay(formatTime(booking.date))}
        </Text>
        <Text style={booking.date}></Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Time Duration: </Text>
        <Text style={styles.time}>{booking.shift}</Text>
      </View>

      {booking?.headCount != 0 && <View style={styles.nPeopleContainr}>
        <Text style={styles.peopleText}>Number of Persons: </Text>
        <Text style={styles.count}>{booking.headCount}</Text>
      </View>}
      {booking?.totalAmount != 0 && <View style={styles.nPeopleContainr}>
        <Text style={styles.peopleText}>Total Amount: </Text>
        <Text style={styles.count}>{`${booking.totalAmount} PKR`}</Text>
      </View>}
      {booking?.advanceAmount != 0 && <View style={styles.nPeopleContainr}>
        <Text style={styles.peopleText}>Amount Paid: </Text>
        <Text style={styles.count}>{`${booking?.advanceAmount} PKR`}</Text>
      </View>}
      {/* For now its commented it will be implement */}
      {/* <View style={styles.pkgContainer}>
        <Text style={styles.pkgText}>Pkg: </Text>
        <Text style={styles.pkgCount}>{booking.package}</Text>
      </View> */}
      <View style={styles.btnContainer}>
        {booking.status != "pending" && (
          <View style={styles.viewBtn}>
            <Button
              text={"Invite"}
              icon={<FontAwesome5 name="share" size={20} color="white" />}
              onPress={() => sendInvite(booking)} />
          </View>
        )}
        {booking.status === "pending" && (
          <View style={styles.payBtn}>
            <Button
              onPress={onPaynowBtnPress}
              text={"Pay Now"}
              icon={<Payment2 width={20} height={20} />}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default Bookings;
