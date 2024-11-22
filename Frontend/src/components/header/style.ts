import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    borderColor: colors.white
  },
  text: {
    fontSize: fontSize.average,
    color: colors.white,
    textAlign: "center",
    fontFamily: fontFamily.tommyMedium
  },
  iconContainer: {
    width: 40,
    height: 40,
    padding: 2,
    top: 8,
    position: "absolute",
    left: 20
  },
  icon: {
    width: undefined,
    height: undefined,
    flex: 1
  }
});
