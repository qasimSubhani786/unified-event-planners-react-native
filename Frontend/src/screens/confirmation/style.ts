import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  scroll: {
    marginHorizontal: 20
  },
  summary: {
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 10,
    padding: 15,
    borderRadius: 10
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  dateTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.small
  },
  date: {
    fontFamily: fontFamily.tommy,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.small,
    flex: 8,
    textTransform: "capitalize"
  },

  timeContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  timeTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.small
  },
  time: {
    fontFamily: fontFamily.tommy,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.small
  },

  nPeopleContainr: {
    marginTop: 5
  },
  peopleText: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.small
  },
  countParent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  countContainer: {
    backgroundColor: colors.blue1,
    width: 250,
    borderRadius: 5,
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  count: {
    color: colors.white,
    fontSize: fontSize.large
  },
  plusContaienr: {},
  plus: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.white
  },
  minus: {
    padding: 10,
    borderRadius: 5,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  },
  mealsTxt: {
    fontSize: 16,
    fontFamily: fontFamily.tommyMedium,
    marginTop: 10
  },
  otherText: {
    fontSize: 16,
    fontFamily: fontFamily.tommyMedium,
    marginTop: 10
  },
  totalInvoiceItem: {
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 3,
    flex: 1,
    borderBottomWidth: 0.3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: colors.gray2
  },
  mealConatiner: {
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 2,
    borderRadius: 10
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
    backgroundColor: colors.black
  },
  bulletText: {
    color: colors.black,
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    marginVertical: -2,
    paddingVertical: -5
  },
  priceParent: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  priceContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.blue1,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 5,
    marginLeft: 5
  },
  price: {
    color: colors.white,
    padding: 5,
    fontSize: 14,
    fontFamily: fontFamily.tommyBold
  },
  billPaymentContainer: {
    // flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  billText: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.tommy
  },
  priceBold: {
    fontSize: 16,
    fontFamily: fontFamily.tommyBold
  },
  billItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioText: {
    fontFamily: fontFamily.tommyBold,
    fontSize: fontSize.large
  },
  otherConatiner: {
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 5,
    borderRadius: 10
  },
  radioGroup: {
    marginLeft: 0
  },
  radioButton: {
    justifyContent: "flex-start",
    flexDirection: "row-reverse"
  },

  radioLabel: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: 14
  },

  buttons: {
    marginVertical: 20,
    flexDirection: "row"
  },
  btn1: {
    flex: 1,
    marginRight: 2
  },
  btn2: {
    flex: 1,
    marginLeft: 2
  },
  numberGuest: {
    color: colors.white,
    fontSize: 16,
    padding: 0,
    margin: 0,
    flex: 1,
    alignItems: "center",
    textAlign: "center"
  }
});

export const shiftStyles = (shift: string) =>
  StyleSheet.create({
    bullet: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: shift === "morning" ? colors.blue1 : shift === "night" ? colors.red3 : colors.yellow2
    }
  });
