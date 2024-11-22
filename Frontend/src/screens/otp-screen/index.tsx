import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useRef } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { Button } from '../../components';
import { ALL_TEXTS, colors } from '../../common';
import { useVerifyOtpMutation } from '../../utils/redux/slice/emptySplitApi';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constant/navigationType';

const OTPScreen = ({ route }) => {
  const navigation = useNavigation<StackNavigation>();

  const { phone } = route.params
  const otpInput = useRef(null);
  const [verifyOtp, otpRes] = useVerifyOtpMutation();

  const otpHandler = async () => {
    const enteredOTP = otpInput?.current?.state?.otpText
      ?.toString().replace(/,/g, '');;
    let data2 = { "phone": phone, "otp": enteredOTP }
    let res: any = await verifyOtp(data2)
    debugger
    if (res && res?.data?.success) {
      ToastAndroid.show("OTP Verified! Please Enter New Password", ToastAndroid.SHORT);
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.PASSWORD_RESET, { phone: phone })
    } else {
      Alert.alert("Error", "Please Enter Correct OTP");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}>
          <AntIcon name="left" size={25} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{"Verify your Phone Number"}</Text>
          <Text
            style={
              styles.detail
            }>{"Enter OTP sent to your existing number"}</Text>
        </View>
      </View>
      <OTPTextInput
        ref={otpInput}
        inputCount={6}
        tintColor={colors.blue1}
        textInputStyle={styles.textInput}
        containerStyle={{
          marginTop: 15,
        }}
      />

      <View style={styles.btnContainer}>
        <Button
          text={'Continue'}
          onPress={otpHandler}
          loader={otpRes.isLoading}
        />
      </View>
    </View>
  );
};

export default OTPScreen;
