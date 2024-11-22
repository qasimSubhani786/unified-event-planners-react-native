import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Input, Button, Header } from "../../components";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import { Formik } from "formik";
import { ChangePasswordFormValidation } from "../../common/schemas";
import { LogoIcon } from "../../utils/svgs/index";
import { AntDesign } from "@expo/vector-icons";
import {
  useChnagePasswordMutation,
  useLoginMutation,
} from "../../utils/redux/slice/emptySplitApi";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import { setUser } from "../../utils/redux/reducer/mainSlice";
import { textStyle } from "../hall-detail/styles";

const ChangePassword = ({ }) => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.auth?.user);

  const [changePassAPI, chngPassRes] = useChnagePasswordMutation();
  const [loginAPI, loginResponse] = useLoginMutation();

  const changePasswordHandler = async (data: object, action: any) => {
    let response = await changePassAPI(data);
    if (response && response?.data?.success) {
      dispatch(setUser(null));
      Alert.alert(
        "Success",
        "Password has been successfully updated", [{
          text: "Ok", onPress: () => {
            navigation.replace(ALL_TEXTS.SCREEN_NAME.LOGIN)
          }
        }]
      );
    } else {
      const error = response?.error?.data?.message;
      const errorMsg = error || response?.data?.message;
      Alert.alert(
        "Error",
        errorMsg.name ? "User Password not match with correct" : errorMsg
      );
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Header text={"Change  Password"} />
      <Formik
        onSubmit={(values, formikActions) => {
          changePasswordHandler(values, formikActions);
        }}
        validationSchema={ChangePasswordFormValidation}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <View style={{ flex: 1, marginTop: 50 }}>
              <View>
                <Text style={[textStyle(colors.black2, fontFamily.tommyMedium, 22).text, { textAlign: "center" }]} >Update Your Current Password</Text>
                <View style={styles.formContainer}>
                  <View style={styles.secondInputTop}>
                    <Input
                      name="oldPassword"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.ChnagePassword.oldPassword}
                      icons={<AntDesign name="lock1" size={24} color="black" />}
                      isPassword={true}
                      error={touched.oldPassword && errors.oldPassword}
                      onBlur={handleBlur("oldPassword")}
                      setState={handleChange("oldPassword")}
                    />
                  </View>
                  <View style={styles.secondInputTop}>
                    <Input
                      name="newPassword"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.ChnagePassword.newPassword}
                      icons={<AntDesign name="lock1" size={24} color="black" />}
                      isPassword={true}
                      error={touched.newPassword && errors.newPassword}
                      onBlur={handleBlur("newPassword")}
                      setState={handleChange("newPassword")}
                    />
                  </View>
                  <View style={styles.secondInputTop}>
                    <Input
                      name="confirmPassword"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.ChnagePassword.confirmPassword}
                      icons={<AntDesign name="lock1" size={24} color="black" />}
                      isPassword={true}
                      error={touched.confirmPassword && errors.confirmPassword}
                      onBlur={handleBlur("confirmPassword")}
                      setState={handleChange("confirmPassword")}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <Button
                  customStyle={{ width: 200 }}
                  text={"Change Password"}
                  onPress={handleSubmit} // Make sure this is correct
                  loader={chngPassRes.isLoading}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default ChangePassword;
