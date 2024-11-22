import {
  SafeAreaView,
  View,
  Text,
  Image,
  ToastAndroid,
  Alert,
  ScrollView,
} from "react-native";
import { style } from "./style";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import { Button, Header, Input, ScreenLoader } from "../../components";
import { Formik } from "formik";
import { UpdateProfileSchema } from "../../common/schemas";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLazyGetCurrentUserQuery, useUpdateProfileMutation } from "../../utils/redux/slice/emptySplitApi";
import { setUser } from "../../utils/redux/reducer/mainSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { useEffect } from "react";
import { textStyle } from "../hall-detail/styles";

const UpdateProfile = () => {
  const userInfo = useSelector((state: any) => state?.auth?.user);
  const [updatePassApi, updatePassRes] = useUpdateProfileMutation();
  const [currentUserAPI, currentUserResponse] = useLazyGetCurrentUserQuery()
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const fetchCurrentUser = async () => {
    await currentUserAPI(null)
  }

  const profileData = currentUserResponse?.data?.data

  const updateProfileHandler = async (data: object, action: any) => {
    let response: any = await updatePassApi(data);
    if (response && response?.data?.success) {
      let newUserInfo = {
        name: data?.name,
        cnic: data?.cnic,
        _id: userInfo._id,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
        token: userInfo.token,
        phone: userInfo?.phone,
      };
      dispatch(setUser(newUserInfo));
      navigation.goBack()
      ToastAndroid.show("User Updated Succesfully", ToastAndroid.SHORT);
    } else {
      const error = response?.error?.data?.message;
      const errorMsg = error || response?.data?.message;
      Alert.alert(
        "Error",
        errorMsg.name ? "User With this CNIC already exists!" : errorMsg
      );
    }
  };

  return (
    <SafeAreaView style={style.parent}>
      <Header text={ALL_TEXTS.HEADINGS.updateProfile} backIcon={true} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style.scrollContainer}
      >
        <Formik
          onSubmit={(values, formikActions) => {
            const { email, name, cnic } = values;
            updateProfileHandler(values, formikActions);
          }}
          validationSchema={UpdateProfileSchema}
          enableReinitialize
          initialValues={{
            email: profileData?.email,
            name: profileData?.name,
            cnic: profileData?.cnic,
            phone: profileData?.phone
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => {
            return (
              currentUserResponse.isFetching ? <ScreenLoader /> :
                <ScrollView style={{ height: "100%" }}>
                  <View style={style.inputsContainer}>
                    <Text style={style.nameLabl}>{ALL_TEXTS.TEXTS.Name}</Text>
                    <Input
                      icons={<Feather name="user" size={24} color="black" />}
                      name="name"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.name}
                      isPassword={false}
                      keyboardType="name"
                      error={touched.name && errors.name}
                      onBlur={handleBlur("name")}
                      setState={handleChange("name")}
                      value={values.name}
                    />
                  </View>
                  <View style={style.inputsContainer}>
                    <Text style={style.nameLabl}>{ALL_TEXTS.TEXTS.Email}</Text>
                    <Input
                      name="email"
                      icons={<AntDesign name="mail" size={24} color="black" />}
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.UpdateProfile.Email}
                      editable={false}
                      value={userInfo.email}
                      isDisable
                    />
                  </View>
                  <View style={style.inputsContainer}>
                    <Text style={style.nameLabl}>{ALL_TEXTS.TEXTS.CNIC}</Text>
                    <Input
                      name="cnic"
                      placeholder={ALL_TEXTS.PLACEH_HOLDER.Signup.cnic}
                      icons={
                        <Ionicons name="md-key-outline" size={24} color="black" />
                      }
                      isPassword={false}
                      keyboardType="numeric"
                      error={touched.cnic && errors.cnic}
                      onBlur={handleBlur("cnic")}
                      setState={handleChange("cnic")}
                      value={values.cnic}

                    />
                  </View>
                  <View style={style.inputsContainer}>
                    <Text style={style.nameLabl}>Phone</Text>
                    <Input
                      name="phone"
                      placeholder={'Enter Phone number'}
                      icons={
                        <Feather name="phone" size={24} color="black" />
                      }
                      isPassword={false}
                      keyboardType="numeric"
                      error={touched.phone && errors.phone}
                      onBlur={handleBlur("phone")}
                      setState={handleChange("phone")}
                      value={values.phone}

                    />
                  </View>
                  <View style={style.btnContainer}>
                    <Button
                      text={"Save"}
                      onPress={handleSubmit}
                      loader={updatePassRes.isLoading}
                    />
                  </View>
                </ScrollView>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
