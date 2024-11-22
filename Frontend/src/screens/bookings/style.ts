import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headContainer: {
    marginTop: 10,
    marginLeft: 10
  },
  activeBooking: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.sbig,
    marginTop: 10,
    color: colors.black
  },
  desc: {
    marginTop: 5,
    fontSize: fontSize.xsmall,
    fontFamily: fontFamily.tommy,
    color: colors.black
  },
  noteContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  note: {
    fontSize: fontSize.big,
    fontFamily: fontFamily.tommyMedium,
    color: colors.red3
  },
  noteText: {
    marginHorizontal: 10,
    paddingRight: 30,
    fontSize: fontSize.xsmall,
    color: colors.gray3,
    flex: 7
  },
  listItemContainer: {
    borderWidth: 1,
    borderColor: colors.gray3,
    margin: 10,
    marginRight: 20,
    padding: 15,
    borderRadius: 10
  },

  listItemRow1Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  listTitle: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.tommyMedium,
    paddingRight: 10,
    flex: 0.7
  },
  elispeConfirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.3,
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
  iconsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  edit: {
    marginRight: 5
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
    fontSize: fontSize.small
  },
  time: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.small
  },

  nPeopleContainr: {
    flexDirection: "row",
    marginTop: 5
  },
  peopleText: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.normalHalf
  },
  count: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.normalHalf
  },
  dayTEXT2: {
    marginLeft: 10
  },

  pkgContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  pkgText: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.normal
  },
  pkgCount: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.normalHalfl
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 15
  },
  viewBtn: {
    flex: 1,
    marginRight: 5
  },
  payBtn: {
    flex: 1,
    marginLeft: 5
  },
  loaderContainer: {
    flex: 1,
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  dropdownContainer1: {
    marginTop: 10,
    zIndex: 999,
    marginHorizontal: 17,
    marginLeft: 7
  },
  text: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.normal,
    marginVertical: -5
  },
  dropDown: {
    marginTop: 10,
    borderColor: colors.gray2,
    borderRadius: 13
  }
});
