import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native";
import { style } from "./style";
import { Button, Header } from "../../components";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Payment } from "../../utils/svgs";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigation } from "../../constant/navigationType";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/redux/reducer/mainSlice";
import { textStyle } from "../hall-detail/styles";



export const LoginRequiredComponent = ({ text }) => {
  const navigation = useNavigation<StackNavigation>();
  return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}  >
    <FontAwesome5 name="user-lock" size={150} color={colors.gray2} />
    <Text style={[textStyle(colors.black2, fontFamily.tommy, 16).text, { marginVertical: 20 }]} >{text}</Text>
    <Button text={"Login "}
      customStyle={{ width: '40%' }}
      onPress={() => {
        navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)
      }} />
  </View>)

}

const Profile = ({ }) => {
  const navigation = useNavigation<StackNavigation>();
  const userInfo = useSelector((state: any) => state?.auth?.user)
  const dispatch = useDispatch()


  const listItems = [
    {
      icon: <AntDesign name="user" size={24} color={colors.black} />,
      text: "My Profile",
      navigationURL: ALL_TEXTS.SCREEN_NAME.UPDATE_PROFILE,
    },
    {
      icon: <Payment height={24} width={24} color={colors.black2} />,
      text: "Payments",
      navigationURL: ALL_TEXTS.SCREEN_NAME.PAYMENT
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="star-shooting"
          size={24}
          color={colors.black2}
        />
      ),
      text: "My Favourites",
      navigationURL: ALL_TEXTS.SCREEN_NAME.FAVOURITE,
    },
    {
      icon: <AntDesign name="lock" size={24} color={colors.black2} />,
      text: "Change Password",
      navigationURL: ALL_TEXTS.SCREEN_NAME.CHANGE_PASSWORD
    }

  ];
  const logoutHandler = () => {
    dispatch(setUser(null))
    navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header text={ALL_TEXTS.HEADINGS.profile} />
      {!userInfo ? (
        <LoginRequiredComponent text={"Unlock Profile Section by Logging In"} />
      ) : <>
        <ScrollView>
          <View style={style.avatarContainer}>
            <View style={{ height: 100, width: 100 }}  >
              <Image source={require("../../../assets/profile.webp")} style={{ height: undefined, width: undefined, flex: 1 }} />
            </View>
            <Text style={style.name}>{userInfo?.name || 'Anonymouse'}</Text>
          </View>

          <View style={style.listParent}>
            {listItems.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity style={style.listContainer} onPress={() => navigation.navigate(item.navigationURL)}>
                  <View style={style.iconTxtContainer}>
                    <View style={style.icon}>{item.icon}</View>
                    <Text style={style.profileText}>{item.text}</Text>
                  </View>
                  <MaterialIcons
                    size={24}
                    name="keyboard-arrow-right"
                    color={colors.black2}
                  />
                </TouchableOpacity>
                <View style={style.horizontalLine}>
                </View>
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <View style={style.buttonContainer}>
          <Button
            onPress={logoutHandler}
            text={ALL_TEXTS.BUTTON_TEXT.logout}
            icon={
              <MaterialCommunityIcons
                name="logout"
                size={30}
                color={colors.white}
              />
            }
          />
        </View>
      </>}

    </SafeAreaView>
  );
};

export default Profile;
