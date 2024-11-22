import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";
const {width: screenWidth} = Dimensions.get("window");

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    margin: 10
  },
  item: {
    width: screenWidth - 75,
    height: 250
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 15
  },
  sliderItem: {position: "absolute", backgroundColor: colors.white, bottom: 20, padding: 8, borderTopRightRadius: 10, borderBottomRightRadius: 10},
  sliderItemText: {
    color: colors.black,
    fontFamily: fontFamily.tommy
  },
  arrowIcon: {
    backgroundColor: colors.gray4,
    position: "absolute",
    zIndex: 1000,
    height: 35,
    width: 35,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    top: "40%"
  },
  promotionBadge: {
    backgroundColor: colors.red2,
    borderRadius: 10,
    alignSelf: "flex-start",
    padding: 8,
    paddingHorizontal: 15,
    marginTop: 10
  },
  m10: {
    margin: 10
  },
  mt10: {
    marginTop: 10
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mapbtnContainer: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 7,
    // flex: 1,
    marginLeft: "30%",
    flexDirection: "row",
    alignItems: "center"
    // width: 40
  },
  menuSeelctionContainer: {
    backgroundColor: colors.gray5,
    marginTop: 10,
    padding: 15
  },
  topTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  menuItemImageContainer: {height: 100, width: 110, borderRadius: 10},
  menuItemContainer: {
    marginRight: 10,
    borderWidth: 1,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.gray1,
    marginTop: 5,
    maxWidth: 130,
    height: 200
  },
  socialContainer: {
    borderWidth: 1,
    borderColor: colors.gray1,
    backgroundColor: colors.gray5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 10,
    marginTop: 5
  },
  featureItemContainer: {
    marginRight: 10,
    maxWidth: 130,
    marginTop: 5
  },
  featureImageContainer: {
    height: 130,
    width: 110
  },
  reviewContainer: {
    margin: 10
  },
  btnContainer: {flex: 1},
  bottomButtonsContainer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, flex: 1},
  addReviewContainer: {marginTop: 10, borderRadius: 10, backgroundColor: colors.gray5, padding: 8, maxHeight: 300},
  ratingUpperContainer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderTopWidth: 1, borderColor: colors.gray1, paddingVertical: 10},
  socialItem: {backgroundColor: colors.blue1, alignSelf: "flex-start", flexDirection: "row", margin: 5, padding: 5, borderRadius: 10, alignItems: "center", paddingHorizontal: 10},
  otherContainer: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.gray1
  },
  editDateContianer: {
    position: "absolute",
    right: 10,
    top: 10
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  dateTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.large
  },
  date: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.large,
    flex: 8,
    marginRight: 70
  },
  timeContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  timeTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.large
  },
  time: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.large
  },
  status: {
    marginTop: 10
  },
  statusTxt: {
    textAlign: "center",
    backgroundColor: colors.blue5,
    padding: 5,
    borderRadius: 5,
    width: 90,
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    textTransform: "capitalize"
  },
  statusRed: {
    backgroundColor: colors.red3,
    padding: 5,
    borderRadius: 5,
    width: 90,
    textAlign: "center",
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    textTransform: "capitalize"
  },
  statusOranger: {
    backgroundColor: colors.orange,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "capitalize",
    width: 90,
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14
  },
  bookErr:{
    color:colors.gray2,
    fontSize:fontSize.small,
    marginHorizontal:20
  }
});

export const textStyle = (color: any, fontFamily: string, size: number) =>
  StyleSheet.create({
    text: {color: color, fontFamily: fontFamily, fontSize: size}
  });
