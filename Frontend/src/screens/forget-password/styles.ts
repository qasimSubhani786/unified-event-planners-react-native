import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../common/theme";

export const styles = StyleSheet.create({

  parent: {
  },
  

  logoContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center"
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
    marginTop: 50
  },

  logoContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  containerBk: {
    borderRadius: 200,
    height: 300,
    width: 300,
    left: -169,
    top: -232,
    position: 'absolute',
    backgroundColor: colors.blue1
  },
  containerBk2: {
    borderRadius: 200,
    height: 300,
    width: 300,
    right: -169,
    bottom: -565,
    position: 'absolute',
    backgroundColor: colors.blue1
  },

btnContainer: {
    marginTop: 60
  },

});
