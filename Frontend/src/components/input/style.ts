import {StyleSheet} from "react-native";
import {fontFamily, fontSize, colors} from "../../common";

export const styles = StyleSheet.create({
  container: {
    height: 50,
    borderColor: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },

  imageContainer: {
    paddingVertical: 2
  },

  image: {
    paddingVertical: 20,
    height: undefined,
    width: undefined,
    flex: 1
  },

  input: {
    marginLeft: 15,
    color: colors.gray2,
    fontSize: fontSize.small,
    fontWeight: "300",
    width: "84%",
    fontFamily: fontFamily.tommy
  },

  inputWithEye: {
    marginLeft: 15,
    color: colors.gray2,
    fontSize: fontSize.small,
    width: "73%",
    fontFamily: fontFamily.tommy
  },

  eyeContainer: {
    width: "8%"
  },

  eye: {
    paddingVertical: 20,
    height: undefined,
    width: undefined,
    flex: 1,
    marginLeft: 5
  },

  error: {
    color: colors.red,
    textTransform: "capitalize",
    fontFamily: fontFamily.tommy,
    fontSize: 12,
    marginTop: -8
  }
});
