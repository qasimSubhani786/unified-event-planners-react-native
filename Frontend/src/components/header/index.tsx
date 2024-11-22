import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { StatusBar } from 'expo-status-bar';

export function Header({ text, backIcon, onBackPress }) {
  return (
    <View style={[styles.container]}>
      <StatusBar hidden={true} />
      {backIcon && <Pressable onPress={onBackPress} style={styles.iconContainer}>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../../../assets/icons/back.png")}
        />
      </Pressable>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}