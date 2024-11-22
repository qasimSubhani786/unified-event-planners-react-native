// Events.js
import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./style";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Header, ScreenLoader } from "../../components";
import { ALL_TEXTS } from "../../common";
import { StackNavigation } from "../../constant/navigationType";
import { useLazyGetPaymentsQuery } from "../../utils/redux/slice/emptySplitApi";
import NotAvailable from "../../components/not-available";

const Payment = () => {
  const navigation = useNavigation<StackNavigation>();
  const [paymentApi, paymentApiRes] = useLazyGetPaymentsQuery();
  const isFocused = useIsFocused()
  let userPayments = paymentApiRes.data?.data || [];

  useEffect(() => {
    fetchPayment();
  }, [isFocused]);

  const fetchPayment = async () => {
    await paymentApi(null);
  };
  function reverse_(array) {
    return array.map((item, idx) => array[array.length - 1 - idx]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={() => {
          navigation.goBack();
        }}
        text={"Payments"}
        backIcon={true}
      />
      <ScrollView>
        {paymentApiRes.isFetching ? (
          <View style={styles.screenLoader}>
            <ScreenLoader />
          </View>
        ) : userPayments.length === 0 ? (
          <View style={styles.notAvailable}>
            <NotAvailable text={"No Payment has been Made Yet "} />
          </View>
        ) : (
          <View>
            <Text style={styles.payments}>Payment History</Text>
            <Text style={styles.desc}>
              Your Venue Booking Payment Overview{" "}
            </Text>
            {reverse_(userPayments).map((payment) =>
              payment.bookingId ? (
                <PaymentItem key={payment._id} payment={payment} />
              ) : null
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const PaymentItem = ({ payment }) => {
  const bookingStatus = {
    booked: "Booked",
    pending: "Pending",
    completed: "Completed",
  };
  const formatTime = (dateTimeString) => {
    const temp = new Date(dateTimeString);
    return `${temp.getFullYear()}-${String(temp.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(temp.getDate()).padStart(2, "0")}`;
  };

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemRow1Container}>
        <Text style={styles.listTitle}>{payment.bookingId.hall.title}</Text>
        <View style={styles.elispeConfirmContainer}>
          <View
            style={[
              styles.elipse,
              payment.status === "booked" ? styles.blueElipse : null,
              payment.status === "pending" ? styles.yellowElipsed : null,
              payment.status === "completed" ? styles.greenElipsed : null,
            ]}
          ></View>
          <Text style={styles.confirmText}>
            {bookingStatus[payment.status]}
          </Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateTxt}>Payment Date: </Text>
        <Text style={styles.date}>{formatTime(payment.createdDate)}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Advance: </Text>
        <Text style={styles.time}>{payment.advancePercentage}%</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Advance Paid: </Text>
        <Text style={styles.time}>{payment.amountPaid} Rs</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Total Amount: </Text>
        <Text style={styles.time}>{payment.totalBookingAmount} Rs</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Remaining Payable Amount: </Text>
        <Text style={styles.time}>
          {payment.totalBookingAmount - payment.amountPaid} Rs
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>Payment Id: </Text>
        <Text style={styles.time}>{payment.stripePaymentMethodId}</Text>
      </View>
    </View>
  );
};
export default Payment;
