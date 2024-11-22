import { View, Text, SafeAreaView,  Alert, ToastAndroid } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Input, Button } from "../../components";
import { ALL_TEXTS } from "../../common";
import { Formik } from "formik";
import {
  ForgetResetPassSchema,
} from "../../common/schemas";
import { LogoIcon } from "../../utils/svgs/index";
import { AntDesign } from "@expo/vector-icons";
import {
  useUpdateForgotPasswordMutation,
} from "../../utils/redux/slice/emptySplitApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgetResetPass = ({route}) => {
  const navigation = useNavigation<StackNavigation>();
  const [updateForgotAPI, updateForgotRes] = useUpdateForgotPasswordMutation();
  const {phone} = route.params

  const forgetResetHandler = async (data: object, action: any) => {
    let data2={phone:phone,password:data.password}
    let res=await updateForgotAPI(data2)
    if(res&&res.data.success){
        ToastAndroid.show("Password Reset Succesfully !", ToastAndroid.SHORT);
        navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)
    }else{
        Alert.alert("Error",res.data.message);
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.containerBk}></View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          <View style={styles.logoContainer}>
            <LogoIcon height={150} width={150} />
          </View>
          <Text style={styles.loginText}>{"Reset Password"}</Text>
          <Formik
            onSubmit={(values, formikActions) => {
              const { password } = values;
              forgetResetHandler(values, formikActions);
            }}
            validationSchema={ForgetResetPassSchema} // Correct this to your validation schema
            initialValues={{
              password: "",
              confirmPassword:""
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <View style={styles.formContainer}>
                <View style={styles.secondInputTop}>
                  <Input
                    name="password"
                    placeholder={ALL_TEXTS.PLACEH_HOLDER.Login.password}
                    icons={<AntDesign name="lock1" size={24} color="black" />}
                    isPassword={true}
                    error={touched.password && errors.password}
                    onBlur={handleBlur("password")}
                    setState={handleChange("password")}
                  />
                </View>
                <View style={styles.secondInputTop}>
                  <Input
                    name="confirmPassword"
                    placeholder={"Enter Confirm Password"}
                    icons={<AntDesign name="lock1" size={24} color="black" />}
                    isPassword={true}
                    error={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur("confirmPassword")}
                    setState={handleChange("confirmPassword")}
                  />
                </View>


                <View style={styles.btnContainer}>
                  <Button
                    text={"Reset Password"}
                    onPress={handleSubmit}
                    loader={updateForgotRes.isLoading} // Use the correct loader property
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.containerBk2}></View>
    </SafeAreaView>
  );
};

export default ForgetResetPass;
