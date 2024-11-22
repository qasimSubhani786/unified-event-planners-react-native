import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common/theme";

export const styles = StyleSheet.create({

  parent:{
    flex:1,
    
    // marginBottom:400
  },
  logoContainer: {
    marginTop:60,
    alignItems: "center",
    justifyContent: "center"
  },
  containerBk: {
    borderRadius: 200,
    height: 300,
    width: 300,
    left: -169,
    top: -232,
    position:'absolute',
    backgroundColor: colors.blue1
  },
  containerBk2: {
    borderRadius: 200,
    height: 300,
    width: 300,
    marginLeft:'76%',
    marginBottom: -240,
    position:'relative',
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
    marginTop: 20,
    flex:1
  },

  secondInputTop: {
    marginTop: 10
  },

  btnContainer: {
    marginTop: 40
  },
  loginNavText: {
    color: colors.blue1,
    textAlign: "center",
    marginTop: 30
  },

  scrollContainer: {
  }
});
