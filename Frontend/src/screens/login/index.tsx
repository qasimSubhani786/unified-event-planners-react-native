import { View, Text, SafeAreaView, ImageBackground, Alert } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Input, Button } from "../../components";
import { ALL_TEXTS } from "../../common";
import { Formik } from "formik";
import { LoginValidationSchema } from "../../common/schemas";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LogoIcon } from "../../utils/svgs/index";
import { AntDesign } from "@expo/vector-icons";
import { useLoginMutation } from "../../utils/redux/slice/emptySplitApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/reducer/mainSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ }) => {
  const navigation = useNavigation<StackNavigation>();
  const [loginAPI, loginResponse] = useLoginMutation();
  const dispatch = useDispatch();

  const signinHandler = async (data: object, action: any) => {
    let response = await loginAPI(data);
    if (response && response.data) {
      const {
        data: { data },
      } = response;
      dispatch(setUser(data));
      navigation.goBack({ replace: true });
    } else {
      const {
        error: {
          data: { message },
        },
      } = response;
      Alert.alert("Error", message);
    }
    console.log(response);
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
          <Text style={styles.loginText}>{ALL_TEXTS.TEXTS.Login}</Text>
          <Formik
            onSubmit={(values, formikActions) => {
              const { email, password } = values;
              signinHandler(values, formikActions);
            }}
            validationSchema={LoginValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <View style={styles.formContainer}>
                  <Input
                    name="email"
                    placeholder={ALL_TEXTS.PLACEH_HOLDER.Login.email}
                    icons={<AntDesign name="mail" size={24} color="black" />}
                    error={touched.email && errors.email}
                    onBlur={handleBlur("email")}
                    isPassword={false}
                    setState={handleChange("email")}
                  />
                  <View style={styles.secondInputTop}>
                    <Input
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.Login.password}
                      icons={<AntDesign name="lock1" size={24} color="black" />}
                      isPassword={true}
                      error={touched.password && errors.password}
                      onBlur={handleBlur("password")}
                      setState={handleChange("password")}
                    />
                  </View>
                  <TouchableOpacity onPress={()=>navigation.navigate(ALL_TEXTS.SCREEN_NAME.FORGET_PASSWORD)}>
                    <Text style={styles.forgetPass}>Forget Password?</Text>
                  </TouchableOpacity>
                  <View style={styles.btnContainer}>
                    <Button
                      text={ALL_TEXTS.BUTTON_TEXT.Login}
                      onPress={handleSubmit} // Make sure this is correct
                      loader={loginResponse.isLoading}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
          <TouchableOpacity
            onPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.SIGNUP)}
          >
            <Text style={styles.signupText}>{ALL_TEXTS.TEXTS.Signup}</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
      <View style={styles.containerBk2}></View>

      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default Login;
