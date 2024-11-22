import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
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
  card: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 5,
    flexDirection: "row"
    // alignItems: 'center'
  },
  cardImageConatianer: {
    flex: 0.4,
    width: 110,
    height: 100,
    borderRadius: 10
  },
  cardImage: {
    width:undefined,
    height: undefined,
    flex: 1,
    borderRadius: 12
  },
  titleHeartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  cardDetail: {
    flex: 0.6,
    marginLeft: 5
  },
  cardTitle: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.small,
    flex: 0.7
  },
  heart: {
    flex: 0.13,
    marginLeft: 0,
    padding: 0,
    justifyContent: "flex-end"
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
  },
  loader: {
    flex: 1,
    alignItems: "center",
    marginTop: "50%"
  },
  nofv8: {
    flex: 1,
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  noFav8Text: {
    color: colors.gray3,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.tommyMedium
  },
  subTxxt: {
    color: colors.gray3,
    fontSize: fontSize.small,
    fontFamily: fontFamily.tommy,
    textAlign: "center",
    width: "80%",
    marginTop: 10
  },

  contBtn: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20
  }
});
