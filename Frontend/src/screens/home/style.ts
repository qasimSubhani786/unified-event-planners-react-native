import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors, fontFamily} from "../../common";
const {width: screenWidth} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    width: screenWidth - 75,
    height: screenWidth - 100
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  sliderItem: {position: "absolute", backgroundColor: colors.white, bottom: 20, padding: 8, borderTopRightRadius: 10, borderBottomRightRadius: 10},
  sliderItemText: {
    color: colors.black,
    fontFamily: fontFamily.tommyBold
  },
  eventItemWrapper: {
    // height: 125,
    width: "45%",
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    // borderWidth: 1,
    shadowColor: colors.black,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    backgroundColor: colors.white,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  eventItemTextContainer: {
    margin: 3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  eventImage: {
    height: 100,
    width: 110
  },
  eventImage_: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 10
  },
  eventItemText: {fontFamily: fontFamily.tommy, fontSize: 13, color: colors.black, textAlign: "center"},
  wrapper: {flex: 1, backgroundColor: colors.white},
  m10: {
    margin: 10
  },
  mt10: {
    marginTop: 10
  },
  screenContainer_: {marginTop: 10},
  manageTitle: {
    fontFamily: fontFamily.tommy,
    fontSize: 20,
    color: colors.black
  },
  secondaryContainer: {flexDirection: "row", marginTop: 10},
  upcomingEventBox: {backgroundColor: colors.primary, height: 250, width: "38%", borderRadius: 15, marginVertical: 5, marginRight: 5},
  upEventBox: {flexDirection: "row", alignItems: "center", height: "50%", padding: 10},
  eventCount: {fontFamily: fontFamily.tommyBold, fontSize: 20, color: colors.black},
  stars: {position: "absolute", right: 10, top: 8},
  eventTextContainer: {height: "50%", alignItems: "center", justifyContent: "center"},
  eventText: {
    color: colors.white,
    fontFamily: fontFamily.tommyMedium,
    fontSize: 22
  },
  eventItems: {flex: 1, flexDirection: "row", flexWrap: "wrap"},
  viewAllContainer: {alignItems: "center", flexDirection: "row", justifyContent: "flex-end"},
  viewAllText: {
    fontSize: 18,
    marginRight: 5,
    color: colors.primary,
    fontFamily: fontFamily.tommyMedium,
    margin: 10
  },
  centerLoader: {flex: 1, alignItems: "center", justifyContent: "center"}
});
