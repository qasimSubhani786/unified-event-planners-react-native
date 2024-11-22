import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../common";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:10,
        width:'90%',
        height:'100%',
        backgroundColor: "#ffffff",
    },
    heading:{
        fontFamily:fontFamily.tommyMedium,
        fontSize:fontSize.average
    },
    subHead:{
        fontFamily:fontFamily.tommy,
        fontSize:fontSize.normal,
        color:colors.black,
        marginTop:5,
    },
    ratingContainer: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textInput: {
        height: 300,
        width: "100%",
        padding:5,
        borderWidth: 1,
        borderColor: colors.gray1,
        fontFamily:fontFamily.tommy,
        paddingHorizontal: 10,
        fontSize: fontSize.medium,
        borderRadius:10,
        color: "#000000",
        textAlignVertical: "top", // Add this line to align the text at the top
    },
    addBtn:{
        marginTop:20
    }
});
