import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Input, Button } from "../../components";
import { ALL_TEXTS } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { SignupValidationSchema } from "../../common/schemas";
import { LogoIcon } from "../../utils/svgs";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useSignUpMutation } from "../../utils/redux/slice/emptySplitApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/reducer/mainSlice";
import { ScrollView } from "react-native-gesture-handler";

const Signup = ({}) => {
  const navigation = useNavigation<StackNavigation>();
  const [signUpAPI, signUpResponse] = useSignUpMutation();
  const dispatch = useDispatch();

  const signinHandler = async (data: object, action: any) => {
    data.isAdmin = false;
    let response = await signUpAPI(data);
    if (response && response?.data?.success) {
      dispatch(setUser(response?.data?.data));
      ToastAndroid.show("Welcome to Unified Planners", ToastAndroid.SHORT);
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME);
  } else {
      const error = response?.error?.data?.message;
      const errorMsg = error || response?.data?.message;
      Alert.alert(
        "Error",
        errorMsg.name
          ? "User cnic Alredy exists in our DB. Please use another one"
          : errorMsg
      );
    }
  };

  return (
    <SafeAreaView style={styles.parent}>
      <ScrollView>
        <View style={styles.containerBk}></View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <View>
            <View style={styles.logoContainer}>
              <LogoIcon height={150} width={150} />
            </View>
            <Text style={styles.loginText}>{ALL_TEXTS.TEXTS.Signup}</Text>
            <Formik
              onSubmit={(values, formikActions) => {
                const { email, password, name, cnic, phone } = values;
                signinHandler(values, formikActions);
              }}
              validationSchema={SignupValidationSchema}
              initialValues={{
                name: "",
                email: "",
                password: "",
                cnic: "",
                phone: "",
              }}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                return (
                  <View style={styles.formContainer}>
                    <Input
                      name="name"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.name}
                      icons={<Feather name="user" size={24} color="black" />}
                      error={touched.name && errors.name}
                      onBlur={handleBlur("name")}
                      setState={handleChange("name")}
                    />
                    <View style={styles.secondInputTop}>
                      <Input
                        name="email"
                        placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.email}
                        icons={
                          <AntDesign name="mail" size={24} color="black" />
                        }
                        error={touched.email && errors.email}
                        onBlur={handleBlur("email")}
                        setState={handleChange("email")}
                      />
                    </View>
                    <View style={styles.secondInputTop}>
                      <Input
                        name="phone"
                        placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.phone}
                        icons={
                          <AntDesign name="phone" size={24} color="black" />
                        }
                        error={touched.phone && errors.phone}
                        onBlur={handleBlur("phone")}
                        keyboardType="numeric"
                        setState={handleChange("phone")}
                      />
                    </View>
                    <View style={styles.secondInputTop}>
                      <Input
                        placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.password}
                        icons={
                          <AntDesign name="lock1" size={24} color="black" />
                        }
                        isPassword={true}
                        error={touched.password && errors.password}
                        onBlur={handleBlur("password")}
                        setState={handleChange("password")}
                      />
                    </View>
                    <View style={styles.secondInputTop}>
                      <Input
                        placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.cnic}
                        icons={
                          <Ionicons
                            name="md-key-outline"
                            size={24}
                            color="black"
                          />
                        }
                        isPassword={false}
                        error={touched.cnic && errors.cnic}
                        onBlur={handleBlur("cnic")}
                        setState={handleChange("cnic")}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.btnContainer}>
                      <Button
                        loader={signUpResponse.isLoading}
                        text={ALL_TEXTS.BUTTON_TEXT.Signup}
                        onPress={handleSubmit} // Make sure this is correct
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
            <TouchableOpacity
              onPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)}
            >
              <Text style={styles.loginNavText}>
                {ALL_TEXTS.BUTTON_TEXT.Login}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View style={{ justifyContent: "flex-end" }}>
          <View style={styles.containerBk2}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
