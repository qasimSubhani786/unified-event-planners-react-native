import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1
  },
  container: {
    margin: 5
  },
  toptextContainer: {
    margin: 10
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
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
  selectedItemContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    backgroundColor: colors.blue3,
    borderWidth: 1,
    borderColor: colors.primary
  },
  itemImage: {
    borderRadius: 8,
    height: "100%",
    width: 150,
    flex: 0.35
  },
  itemSecondaryContainer: {
    marginLeft: 8,
    flex: 0.65
  },
  offer: {
    position: "absolute",
    backgroundColor: colors.red2,
    zIndex: 100,
    right: 0,
    borderBottomLeftRadius: 8,
    padding: 5,
    borderTopRightRadius: 8
  },
  itemTitle: {},

  btnDetailText: {
    color: colors.blue1,
    fontSize: 12,
    fontFamily: fontFamily.tommy
  },
  detailsImageContainer: {
    height: 200,
    width: "100%",
    borderRadius: 10
  },
  detailsContainer: {padding: 12, borderWidth: 0},
  detailBtn: {
    borderWidth: 1,
    color: colors.blue1,
    borderColor: colors.blue1,
    padding: 7,
    borderRadius: 5,
    // alignSelf: "flex-end",
    marginTop: 5
  },
  menuItemBtnContainer: {alignItems: "flex-end", justifyContent: "space-between", flexDirection: "row"},
  bottomItemContainer: {
    // flexDirection: "row"
    // justifyContent: "space-between"
  },
  detailsTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10
  },
  mt10: {
    marginVertical: 10
  },
  mt5: {
    marginVertical: 3
  },
  detailsMenuItemContainer: {
    marginTop: 10
  },
  adsOnContainer: {
    marginTop: 8
  },
  checkedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between"
  },
  buttonContainer: {
    margin: 10
  },
  radioHorizontal: {flexDirection: "row", justifyContent: "flex-start"}
});
