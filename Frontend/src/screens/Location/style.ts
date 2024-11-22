import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../common";

export const styles = StyleSheet.create({

    majorContainer:{
        backgroundColor:colors.white,
        flex: 1
    },
    container: {
        flexGrow: 1, // Allow container to grow to fill the available space
        padding: 18,
        marginTop: 20,
        height: '85%'
    },
    dropdownContainer1: {
        marginTop: 25,
        zIndex: 999
    },
    dropdownContainer: {
        marginTop: 30,
    },

    nearby:{
        textAlign: "center",
        fontSize: fontSize.h6,
        fontFamily: fontFamily.tommy,
        color: colors.blue1,
        marginTop: 40,
    },
   
    text: {
        fontFamily: fontFamily.tommy,
        fontSize: fontSize.normal
    },
    dropDown: {
        marginTop: 10,
        borderColor: colors.gray2,
        borderRadius: 13
    },
    button: {
        position: 'absolute',
        bottom:30,
        width:"100%",
        marginHorizontal:20
    },
    errorText:{
        color:colors.red2
    },
    skip:{
        textAlign:'center',
        fontFamily:fontFamily.tommy,
        fontSize:fontSize.small,
        color:colors.blue1,
        marginTop:10,
        marginBottom:10
    }
});
