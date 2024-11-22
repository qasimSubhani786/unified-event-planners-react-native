import {StyleSheet} from "react-native";
import {colors, fontFamily} from "../../common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 18,
    paddingBottom: 50,
    justifyContent: "space-between"
  },

  cardMainContainer: {},

  cardContainer: {
    width: 150,
    height: 154,
    marginRight: "5%",
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 10
  },

  image: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 22
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fontFamily.tommy
  }
});
