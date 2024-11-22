import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common/theme";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.white
  },

  logoContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  containerBk2: {
    borderRadius: 200,
    height: 300,
    width: 300,
    right: -169,
    bottom: -450,
    position: "absolute",
    backgroundColor: colors.blue1
  },

  logo: {
    width: undefined,
    height: undefined,
    flex: 1
  },

  loginText: {
    textAlign: "center",
    fontFamily: fontFamily.tommy,
    fontSize: fontSize.xbig
  },

  formContainer: {
    marginHorizontal: "5%",
    marginTop: 20
  },

  secondInputTop: {
    marginTop: 10
  },

  btnContainer: {
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center"
  },

  signupText: {
    color: colors.blue1,
    textAlign: "center",
    marginTop: 30
  }
});
