import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: colors.blue1
  },
  disableContainer: {
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: colors.gray1
  },

  text: {
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: fontSize.small,
    textAlign: "center"
  },
  iconTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    marginLeft: 10
  }
});
