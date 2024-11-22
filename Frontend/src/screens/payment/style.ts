import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },

  listItemContainer: {
    // borderWidth: 1,
    // borderColor: colors.gray3,
    margin: 10,
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  listItemRow1Container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  listTitle: {
    fontSize: fontSize.large,
    flex: 1,
    color: colors.blue1,
    fontFamily: fontFamily.tommyMedium
  },

  elispeConfirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },

  elipse: {
    width: 16,
    height: 16,
    borderRadius: 10
  },

  blueElipse: {
    backgroundColor: colors.blue2
  },
  yellowElipsed: {
    backgroundColor: colors.yellow2
  },
  greenElipsed: {
    backgroundColor: colors.green
  },
  orangeElipsed: {
    backgroundColor: colors.red
  },
  lightBlueElipse: {
    backgroundColor: colors.blue5
  },

  confirmText: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.tommy,
    marginLeft: 5
  },

  listItemRow2Container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  locationContainer: {
    marginTop: 5,
    flex: 2,
    flexDirection: "row"
  },

  locationText: {
    color: colors.gray3,
    marginLeft: 5,
    fontFamily: fontFamily.tommy,
    fontSize: fontSize.xsmall
  },

  dateContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  dateTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.normalHalf
  },
  date: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.normalHalf,
    flex: 8
  },
  day: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.normalHalf
  },

  timeContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  timeTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.normalHalf
  },
  time: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.normalHalf
  },
  notAvailable: {
    marginTop: "50%"
  },
  screenLoader: {
    marginTop: "50%"
  },
  payments: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.big,
    marginTop: 10,
    marginLeft: 10,
    color: colors.black
  },
  desc: {
    marginTop: 5,
    fontSize: fontSize.xsmall,
    fontFamily: fontFamily.tommy,
    color: colors.black,
    marginLeft: 10
  }
});
