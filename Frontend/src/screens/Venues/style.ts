import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common/theme";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: colors.white
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  locationTextContainer: {
    backgroundColor: colors.blue1,
    // width: '55%',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 20
  },
  loactionText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    textTransform: "capitalize"
  },
  editDelete: {
    width: 30,
    marginRight: 10,
    height: 30
  },
  icon: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 15
  },
  scroll: {
    paddingBottom: 10,
    flexGrow: 1
  },
  cardContainer: {
    marginTop: 10
  },
  card: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: "row"
    // alignItems: 'center'
  },
  cardImageConatianer: {
    flex: 0.4,
    maxWidth: 110,
    height: 100,
    borderRadius: 10
  },
  cardImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 12
  },
  cardDetail: {
    flex: 0.6,
    marginLeft: 5
  },
  cardTitle: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.small
  },

  venueLocationContainer: {
    flexDirection: "row",
    marginTop: 10
  },

  venueLocationText: {
    marginLeft: 3,
    fontFamily: fontFamily.tommy,
    color: colors.gray2,
    fontSize: fontSize.xsmall
  },
  ratingContainer: {
    marginTop: 10, // Add any desired spacing
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  detailBtn: {
    borderWidth: 1,
    color: colors.blue1,
    borderColor: colors.blue1,
    padding: 5,
    borderRadius: 5,
    alignItems: "flex-end"
  },
  btnDetailText: {
    color: colors.blue1,
    fontSize: fontSize.xtiny,
    fontFamily: fontFamily.tommy
  }
});
