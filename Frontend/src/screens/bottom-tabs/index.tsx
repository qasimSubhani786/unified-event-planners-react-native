import { Platform, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Home, Profile, Bookings } from '../index'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const {
  TABNAMES: { HOME },
  SCREEN_NAME: { }
} = ALL_TEXTS;

const HomeStack = () => {
  const headerShown = {
    headerShown: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name={ALL_TEXTS.TABNAMES.HOME} component={Home} options={headerShown} />

    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  const headerShown = {
    headerShown: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name={ALL_TEXTS.TABNAMES.PROFILE} component={Profile} options={headerShown} />
    </Stack.Navigator>
  );
};



const BottomTabBase = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const getTabsStyle = () => {
    if (Platform.OS === "android") {
      return {
        activeTintColor: colors.gray3,
        paddingVertical: 5,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.gray4
      }
    } else {
      return {
        activeTintColor: colors.gray3,
        paddingVertical: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.gray4
      }
    }

  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}
    >
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          keyboardHidesTabBar: true,
          labelStyle: { fontSize: 12, fontFamily: fontFamily.tommyMedium },
          style: getTabsStyle()
        }}
      >
        <Tab.Screen
          name={ALL_TEXTS.TABNAMES.HOME}
          component={HomeStack}
          options={{
            tabBarLabel: ALL_TEXTS.TABNAMES.HOME,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ALL_TEXTS.TABNAMES.BOOKING}
          component={Bookings}
          options={{
            tabBarLabel: ALL_TEXTS.TABNAMES.BOOKING,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ALL_TEXTS.TABNAMES.PROFILE}
          component={ProfileStack}
          options={{
            tabBarLabel: ALL_TEXTS.TABNAMES.PROFILE,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />



      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default BottomTabBase;
