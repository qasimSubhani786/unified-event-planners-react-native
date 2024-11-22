import {StyleSheet} from "react-native";
import {colors, fontFamily, fontSize} from "../../common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  subContainer: {
    marginHorizontal: 10
  },
  calenderContainer: {
    backgroundColor: colors.white,
    marginTop: 15,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 10
  },
  chkContainer: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  chkbtn: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fontFamily.tommy,
    padding: 0,
    height: 35,
    marginBottom: 10
  },
  availabilityText: {
    marginTop: 20,
    fontSize: fontSize.sbig,
    fontFamily: fontFamily.tommyMedium
  },
  itemContaienr: {
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: 20

    // flexDirection:'row'
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioContainer: {
    flex: 0.11
  },
  otherContainer: {
    flex: 0.89
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },

  dateTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.large
  },
  date: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    fontSize: fontSize.large,
    flex: 8,
    marginRight: 70
  },
  timeContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  timeTxt: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.large
  },
  time: {
    fontFamily: fontFamily.tommyLight,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.large
  },

  nPeopleContainr: {
    marginTop: 5
  },
  peopleText: {
    fontFamily: fontFamily.tommyMedium,
    fontSize: fontSize.large
  },
  people: {
    fontFamily: fontFamily.tommy,
    color: colors.black,
    marginLeft: 2,
    flex: 8,
    fontSize: fontSize.large
  },
  status: {
    marginTop: 10
  },
  statusTxt: {
    textAlign: "center",
    backgroundColor: colors.blue5,
    padding: 5,
    borderRadius: 5,
    width: 90,
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    textTransform: "capitalize"
  },
  statusRed: {
    backgroundColor: colors.red3,
    padding: 5,
    borderRadius: 5,
    width: 90,
    textAlign: "center",
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14,
    textTransform: "capitalize"
  },
  statusOranger: {
    backgroundColor: colors.orange,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "capitalize",
    width: 90,
    color: colors.white,
    fontFamily: fontFamily.tommy,
    fontSize: 14
  },
  discount: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    height: 30,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  discountTxt: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSize.normal
  },
  contBtn: {
    flex: 0,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20
  },
  seletecdItemBk: {
    backgroundColor: colors.gray5,
    borderColor: colors.primary
  },
  noVenue:{
    color:colors.gray3,
    fontSize:fontSize.normal,
    fontFamily:fontFamily.tommy,
    textAlign:'center',
    marginTop:20
  }
});
