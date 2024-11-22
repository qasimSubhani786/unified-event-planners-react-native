import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ALL_TEXTS } from "./src/common";
import { useFonts } from "expo-font";
import { setStatusBarStyle } from "expo-status-bar";
import { store } from "./src/utils/redux/store";
import { Provider } from "react-redux";
import {
  Login,
  Signup,
  HallDetails, Event, Location, Venues, Meals, Aminity, Confirmation, CheckAvailability, Favourite, UpdateProfile, ChangePassword, ForgetPassword, OTPScreen, ForgetResetPass, Payment
} from "./src/screens";
import { BottomTabBase } from "./src/screens";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  setStatusBarStyle("dark");
  const Stack = createStackNavigator();
  const headerShown = {
    headerShown: false,
  };
  const {
    SCREEN_NAME: {
      LOGIN,
      SIGNUP,
      BOTTOM_TABS,
      EVENT,
      LOCATION,
      VENUES,
      MEALS,
      AMINITY,
      CONFIRMATION_SCREEN,
      CHECK_AVAILABILITY,
      FAVOURITE,
      CHANGE_PASSWORD,
      UPDATE_PROFILE, FORGET_PASSWORD,
      OTP_SCREEN,
      PASSWORD_RESET,
      PAYMENT
    },
  } = ALL_TEXTS;

  const [loaded] = useFonts({
    tommy: require("./assets/fonts/MADETOMMYRegular.otf"),
    tommyMedium: require("./assets/fonts/MADETOMMYMedium.otf"),
    tommyBold: require("./assets/fonts/MADETOMMYBold.otf"),
    tommyLight: require("./assets/fonts/MADETOMMYThin3.otf")
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !loaded) {
    return null;
  }

  const PublicStacks = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={BOTTOM_TABS}
          component={BottomTabBase}
          options={headerShown}
        />
        <Stack.Screen name={EVENT} component={Event} options={headerShown} />
        <Stack.Screen name={LOCATION} component={Location} options={headerShown} />
        <Stack.Screen name={VENUES} component={Venues} options={headerShown} />
        <Stack.Screen name={ALL_TEXTS.SCREEN_NAME.HOME_DETAIL} component={HallDetails} options={headerShown} />
        <Stack.Screen name={MEALS} component={Meals} options={headerShown} />
        <Stack.Screen name={AMINITY} component={Aminity} options={headerShown} />
        <Stack.Screen name={CONFIRMATION_SCREEN} component={Confirmation} options={headerShown} />
        <Stack.Screen name={LOGIN} component={Login} options={headerShown} />
        <Stack.Screen name={SIGNUP} component={Signup} options={headerShown} />
        <Stack.Screen name={CHECK_AVAILABILITY} component={CheckAvailability} options={headerShown} />
        <Stack.Screen name={FAVOURITE} component={Favourite} options={headerShown} />
        <Stack.Screen name={UPDATE_PROFILE} component={UpdateProfile} options={headerShown} />
        <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} options={headerShown} />
        <Stack.Screen name={FORGET_PASSWORD} component={ForgetPassword} options={headerShown} />
        <Stack.Screen name={OTP_SCREEN} component={OTPScreen} options={headerShown} />
        <Stack.Screen name={PASSWORD_RESET} component={ForgetResetPass} options={headerShown} />
        <Stack.Screen name={PAYMENT} component={Payment} options={headerShown} />

      </Stack.Navigator>
    );
  };


  const MainStack = () => {
    return <PublicStacks />
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51NS32ZKLtPZDBf15lP98oUBJFPrq860zUcAaOUZ6plAHLM8Y0mKTPG8pPYaFrflaISWidWl5okemAUPCzUfA9Nzp00L6BckiT5"
    >
      <Provider store={store}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}
