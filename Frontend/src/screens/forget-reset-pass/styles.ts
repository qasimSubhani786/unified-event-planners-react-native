import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../common/theme";

export const styles = StyleSheet.create({
    parent: {
        // flex: 1,
        // backgroundColor: colors.white
    },
    scrollContainer: {},
    logoContainer: {
        marginTop: 130,
        alignItems: "center",
        justifyContent: "center"
    },
    containerBk2: {
        borderRadius: 200,
        height: 300,
        width: 300,
        right: -169,
        bottom: -520,
        // position: "absolute",
        // bottom: -485,
        position: 'absolute',
        backgroundColor: colors.blue1
    },

    forgetPass: {
        fontFamily: fontFamily.tommy,
        color: colors.blue1,
        fontSize: fontSize.normalHalf,
        textAlign: "right"
    },
    containerBk: {
        borderRadius: 200,
        height: 300,
        width: 300,
        left: -169,
        top: -232,
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
        marginTop: 40
    },

    signupText: {
        color: colors.blue1,
        textAlign: "center",
        marginTop: 30
    }
});
