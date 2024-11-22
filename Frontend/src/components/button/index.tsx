import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { styles } from "./style";
import { Loader } from "../loader";
import { colors } from "../../common";

export function Button({
  text,
  onPress,
  loader,
  isDisable,
  customStyle,
  icon,
  ...props
}) {
  return (
    <TouchableOpacity
      disabled={isDisable || loader}
      style={
        isDisable || loader
          ? [styles.disableContainer, customStyle]
          : [styles.container, customStyle]
      }
      onPress={onPress}
    >
      {loader ? (
        <Loader size={25} color={colors.white} />
      ) : (
        <View style={styles.iconTextContainer}>
          <Text style={styles.text}>{text}</Text>
          {icon && <View style={styles.icon}>
            {icon}
          </View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
