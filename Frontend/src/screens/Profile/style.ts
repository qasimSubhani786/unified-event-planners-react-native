import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common/theme";

export const style = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    alignItems: "center"
  },
  name: {
    fontSize: 18,
    fontFamily: fontFamily.tommyMedium,
    color: colors.black,
    marginTop: 10
  },
  iconTxtContainer: {
    flexDirection: "row"
  },

  icon: {
    marginRight: 20
  },
  listParent: {
    marginTop: 80,
    alignItems: "center"
  },
  listContainer: {
    marginTop: 10,
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  profileText: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.tommyMedium,
    color: colors.black
  },
  horizontalLine: {
    borderBottomColor: colors.gray1,
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust the thickness of the line by changing this value
    width: "80%"
  },

  buttonContainer: {
    marginHorizontal: 30,
    marginBottom: 30
  }
});
