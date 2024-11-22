import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common/theme";

export const style = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.white
  },
  avatarContainer: {
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    alignItems: "center"
  },
  name: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.tommyBold,
    color: colors.black,
    marginTop: 10
  },

  inputsContainer: {
    marginHorizontal: 20,
    marginTop: 10
  },
  nameLabl: {
    marginTop: 4,
    marginBottom: 3,
    fontSize: fontSize.small,
    fontFamily: fontFamily.tommy
  },

  adressContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cityContainer: {
    width: "48%"
  },
  stateContainer: {
    width: "48%"
  },
  btnContainer: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center"
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 20

    // justifyContent: "center",
    // alignItems: "center"
  }
});
