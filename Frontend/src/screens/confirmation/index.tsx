import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { shiftStyles, styles } from "./style";
import { Button, Header, ScreenLoader } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { Minus, Plus } from "../../utils/svgs";
import { RadioButton } from "react-native-paper";
import { useConfirmHallBookingMutation, useGetBookingConfirmationMutation, useLazyUpdateBookoingStatusQuery, usePaymentSheetMutation } from "../../utils/redux/slice/emptySplitApi";
import { useNavigation } from "@react-navigation/native";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import _ from "lodash"
import { textStyle } from "../hall-detail/styles";
import { Formik } from "formik";
import { guestCountSchema } from "../../common/schemas";

const Confirmation = ({ route }) => {
  const getTotalPayable = (percentage) => {
    const totalCost = (numberOfPeople * bookingData?.mealTotal) + bookingData?.amenityTotal
    return (totalCost * percentage)
  }
  const bookingId = route?.params?.bookingId
  const [numberOfPeople, setNumberOfPeople] = useState(50);
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [selectedPayable, setSelectedPayable] = useState(""); // Use this state to track the selected radio button value
  const [getBookingConfirmationAPI, getBookingConfirmationResponse] = useGetBookingConfirmationMutation()
  const [confirmHallBokingAPI, confirmHallBokingResponse] = useConfirmHallBookingMutation()
  const [openPaymentSheetAPI, openPaymentSheetResponse] = usePaymentSheetMutation()
  const [updateBookingStatusAPI, updateBookingStatusResponse] = useLazyUpdateBookoingStatusQuery()
  const navigation = useNavigation<any>()

  useEffect(() => {
    fetchBookingData()
  }, [])

  const fetchBookingData = async () => {
    const payload = {
      headCount: 0,
      advancePercentage: 0,
      bookingId: bookingId
    }
    let response = await getBookingConfirmationAPI(payload)
  }
  const bookingData = getBookingConfirmationResponse?.data?.data
  let UserAmenities = getBookingConfirmationResponse?.data?.data?.aminities
  if (UserAmenities?.length > 0) {
    UserAmenities = _.map(UserAmenities, ({ title, price }) => ({
      title,
      selectedItem: `PKR:${price}/-`
    }))
  }

  useEffect(() => {
    if (bookingData) {
      setSelectedPayable("0.1")
    }
  }, [bookingData, numberOfPeople])


  const label10 = `10% Advance`;
  const label20 = `20% Advance`;
  const label30 = `30% Advance`;

  const getTimeAccordingToShift = (shift: string) => {
    switch (shift) {
      case 'morning':
        return '10AM To 2PM'
      case 'evening':
        return '3PM To 5PM'
      default:
        return '7PM To 10PM'
    }
  }
  const fetchPaymentSheetParams = async () => {
    let reposnePayment: any = await openPaymentSheetAPI({ bookingId: bookingId })
    return reposnePayment?.data?.data
  };
  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setPaymentLoading(true);
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        let response = await updateBookingStatusAPI(bookingId)
        if (response && response.data.success) {
          Alert.alert('Success', 'Your booking has been confirmed Successfully!', [{ text: "Ok", onPress: () => { navigation.navigate(ALL_TEXTS.TABNAMES.BOOKING) } }]);
        }
      }
    }
  };

  const confirmBookingHandler = async (numberOfPeople) => {
    setPaymentLoading(true)
    const confirmbookingPayload = {
      headCount: numberOfPeople,
      advancePercentage: parseFloat(selectedPayable) * 100,
      bookingId: bookingId
    }
    let response: any = await confirmHallBokingAPI(confirmbookingPayload)
    if (response && response.data.success) {
      await initializePaymentSheet()
      setPaymentLoading(false)
    }


  }

  return (
    <SafeAreaView style={styles.container}>
      <Header text={"Confirmation"} backIcon={true} onBackPress={() => {
        navigation.goBack()
      }} />
      {
        getBookingConfirmationResponse.isLoading ? <ScreenLoader /> :
          (<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Formik
              onSubmit={(values, formikActions) => {
                confirmBookingHandler(parseInt(values.noOfPeople))
              }}
              enableReinitialize
              validationSchema={guestCountSchema(bookingData?.hallCapacity)}
              initialValues={{
                noOfPeople: "50",
              }}
            >
              {({ errors, touched, handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {
                return (
                  <>
                    <View style={{ marginTop: 10 }} >
                      <Text style={textStyle(colors.black, fontFamily.tommyMedium, 22).text} >{bookingData?.hallName}</Text>
                    </View>
                    <View style={styles.summary}>
                      {bookingData?.isAvailableForBooking ? (<View>
                        <View style={styles.dateContainer}>
                          <Text style={styles.dateTxt}>Date: </Text>
                          <Text style={styles.date}>{bookingData?.date?.split("T")[0]}</Text>
                        </View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }]}>
                          <Text style={styles.dateTxt}>Shift:</Text>
                          <View style={shiftStyles(bookingData?.shift).bullet} />
                          <Text style={styles.date}>{bookingData?.shift}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                          <Text style={styles.timeTxt}>Time Duration: </Text>
                          <Text style={styles.time}>{getTimeAccordingToShift(bookingData?.shift)}</Text>
                        </View>
                        <View style={styles.nPeopleContainr}>
                          <Text style={styles.peopleText}>Number of People: </Text>
                          <View style={styles.countParent}>
                            <View style={styles.countContainer}>
                              <TouchableOpacity
                                style={styles.minus}
                                onPress={() => {
                                  let noOfPeople = parseInt(values.noOfPeople) - 10
                                  setFieldValue("noOfPeople", noOfPeople)
                                  setNumberOfPeople(noOfPeople)
                                }}
                              >
                                <Minus />
                              </TouchableOpacity>
                              <TextInput
                                keyboardType="numeric"
                                maxLength={4}
                                value={values.noOfPeople.toString()}
                                onChangeText={(e) => {
                                  setFieldValue("noOfPeople", e)
                                  setNumberOfPeople(parseInt(e))
                                }}
                                style={styles.numberGuest}
                              />
                              <TouchableOpacity
                                style={styles.plus}
                                onPress={() => {
                                  let noOfPeople = parseInt(values.noOfPeople) + 10
                                  setFieldValue("noOfPeople", noOfPeople)
                                  setNumberOfPeople(noOfPeople)
                                }}
                              >
                                <Plus />
                              </TouchableOpacity>
                            </View>
                            {touched.noOfPeople && errors.noOfPeople && <Text style={{
                              color: colors.red,
                              textTransform: "capitalize",
                              fontFamily: fontFamily.tommy,
                              fontSize: 12,
                              marginTop: 8
                            }}>{errors.noOfPeople}</Text>}
                          </View>
                        </View>
                      </View>) : <View>
                        <Text style={textStyle(colors.red2, fontFamily.tommy, 14).text} >{`The venue has already been booked by someone and is currently unavailable for reservation on ${bookingData?.date.split("T")[0]} on ${bookingData?.shift}. Please Create New Booking with another Date`}</Text>
                      </View>
                      }
                    </View>
                    {/* meals container */}

                    <MenuItemsContainer
                      heading={"Meals"}
                      list={bookingData?.mealItems}
                      addsOn={bookingData?.mealAddsOn}
                      price={bookingData?.mealTotal * numberOfPeople}
                      isMenue
                      isPayment={false}
                    />
                    <MenuItemsContainer
                      heading={"Amenities"}
                      list={UserAmenities}
                      addsOn={bookingData?.aminityAdsOn}
                      price={bookingData?.amenityTotal}
                      isPayment={false}
                      isMenue
                    />
                    <TotalInvoiceContainer
                      heading={"Total Booking Cost"}
                      data={{ persons: numberOfPeople, mealPrice: bookingData?.mealTotal, decor: bookingData?.amenityTotal }}
                    />

                    <View>
                      <Text style={styles.otherText}>Advance Payment</Text>
                      <View style={styles.otherConatiner}>
                        <RadioButton.Group
                          onValueChange={(newValue) => {
                            const percentage = parseFloat(newValue)
                            setSelectedPayable((newValue))

                          }} // Set the selected value to the state
                          value={selectedPayable}
                        >
                          <RadioButton.Item
                            mode="android"
                            color={colors.primary}
                            style={styles.radioButton}
                            labelStyle={styles.radioLabel}
                            label={label10}
                            value={"0.1"}
                          />
                          <RadioButton.Item
                            mode="android"
                            color={colors.primary}
                            style={styles.radioButton}
                            labelStyle={styles.radioLabel}
                            label={label20}
                            value={"0.2"}
                          />
                          <RadioButton.Item
                            mode="android"
                            color={colors.primary}
                            style={styles.radioButton}
                            labelStyle={styles.radioLabel}
                            label={label30}
                            value={"0.3"}
                          />
                        </RadioButton.Group>
                        <View style={styles.priceParent}>
                          <View style={styles.priceContainer}>
                            <Text style={styles.price}>
                              {`Payable Advance Amount: PKR ${getTotalPayable(selectedPayable)}`}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttons}>
                      <View style={styles.btn1} >
                        <Button
                          onPress={() => {
                            navigation.navigate(ALL_TEXTS.TABNAMES.BOOKING)
                          }}
                          isDisable={!bookingData?.isAvailableForBooking}
                          text={"Save for later"} />
                      </View>
                      <View style={styles.btn2}>
                        <Button
                          isDisable={!bookingData?.isAvailableForBooking}
                          text={"Pay Now"}
                          onPress={handleSubmit}
                          loader={paymentLoading}
                        />
                      </View>
                    </View>
                  </>
                );
              }}
            </Formik>
          </ScrollView>)
      }
    </SafeAreaView>
  );
};

const MenuItemsContainer = ({ heading, list, price, isMenue, data, isPayment, addsOn }) => {
  if (list?.length > 0) {
    return (
      <View>
        {!isPayment && <Text style={styles.mealsTxt}>{heading}</Text>}
        {isPayment && <Text style={styles.otherText}>{heading}</Text>}
        <View style={styles.mealConatiner}>
          <View style={{ padding: 10 }} >
            {isMenue &&
              list?.map((item: any) => (
                <View style={styles.bulletContainer}>
                  <View style={styles.bullet}></View>
                  <Text style={styles.bulletText}>{item.title}</Text>
                  <Text style={[styles.bulletText, { fontFamily: fontFamily.tommyBold }]}>{` (${item.selectedItem}) `}</Text>
                </View>
              ))}
            {addsOn?.length > 0 &&
              <View>
                <Text style={[styles.mealsTxt, { marginVertical: -8, fontSize: 14, fontFamily: fontFamily.tommyBold }]}>Adds On</Text>
                {addsOn?.map((item: any) => (
                  <>
                    <View style={styles.bulletContainer}>
                      <View style={styles.bullet}></View>
                      <Text style={styles.bulletText}>{item.title}</Text>
                      <Text style={[styles.bulletText, { fontFamily: fontFamily.tommyBold }]}>{isMenue ? ` Per-Head(${item.price}/-)` : ` PKR(${item.price}/-)`}</Text>
                    </View>
                  </>
                ))}
              </View>
            }
          </View>
          <View style={styles.priceParent}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>PKR : {price}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

};

const TotalInvoiceContainer = ({ heading, data }) => {
  return (
    <View>
      <Text style={styles.otherText}>{heading}</Text>
      <View style={styles.mealConatiner}>
        <View style={{ padding: 10 }} >
          <View style={styles.billPaymentContainer}>
            <View style={styles.totalInvoiceItem}  >
              <Text style={textStyle(colors.gray2, fontFamily.tommy, 16).text}> Head Count</Text>
              <Text style={styles.priceBold}>{data.persons}</Text>
            </View>
            <View style={styles.totalInvoiceItem}  >
              <Text style={textStyle(colors.gray2, fontFamily.tommy, 16).text}> Per-Head Meal Price</Text>
              <Text style={styles.priceBold}>{`${data?.mealPrice} PKR`}</Text>
            </View>
            <View style={styles.totalInvoiceItem}  >
              <Text style={textStyle(colors.gray2, fontFamily.tommy, 16).text}>Amenities Price</Text>
              <Text style={styles.priceBold}>{`${data.decor} PKR`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceParent}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              Total PKR:{data.persons * data.mealPrice + data.decor}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Confirmation;
