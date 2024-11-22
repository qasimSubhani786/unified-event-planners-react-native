import { View, Text, SafeAreaView, ImageBackground, Alert } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Input, Button } from "../../components";
import { ALL_TEXTS } from "../../common";
import { Formik } from "formik";
import { LogoIcon } from "../../utils/svgs/index";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useReqForgetPassMutation } from "../../utils/redux/slice/emptySplitApi";
import { forgetPassSchema } from "../../common/schemas";

const ForgetPassword = ({}) => {
  const navigation = useNavigation<StackNavigation>();
  const [reqApi, reqRes] = useReqForgetPassMutation();

  const reqForgetHandler = async (data: object, action: any) => {
    let response = await reqApi(data);
    if (response && response.data.success) {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.OTP_SCREEN,{phone:data.phone})
    }else {
      Alert.alert("Error", response.data.message);
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.containerBk}></View>
          <View style={styles.logoContainer}>
            <LogoIcon height={150} width={150} />
          </View>
          <Text style={styles.loginText}>{ALL_TEXTS.TEXTS.ForgetPass}</Text>
          <Formik
            onSubmit={(values, formikActions) => {
              const { phone } = values;
              reqForgetHandler(values, formikActions);
            }}
            validationSchema={forgetPassSchema}
            initialValues={{
              phone: "",
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <View style={styles.formContainer}>
                  <Input
                    name="phone"
                    placeholder={"Enter Your Phone Number"}
                    icons={<AntDesign name="phone" size={24} color="black" />}
                    error={touched.phone && errors.phone}
                    onBlur={handleBlur("phone")}
                    isPassword={false}
                    setState={handleChange("phone")}
                    keyboardType="numeric"

                  />
                  <View style={styles.btnContainer}>
                    <Button text={"Send OTP"} onPress={handleSubmit} loader={reqRes.isLoading} />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.containerBk2}></View>

    </SafeAreaView>
  );
};

export default ForgetPassword;


