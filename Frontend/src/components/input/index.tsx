import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./style";
import { colors } from "../../common";

export const Input = ({
  placeholder,
  setState,
  isPassword,
  icons,
  error,
  isDisable,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(isPassword);

  const handleEyeClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <View style={[styles.container, { backgroundColor: isDisable ? colors.gray1 : null }]}>
        <View style={styles.imageContainer}>
          {icons}
        </View>
        <TextInput
          placeholderTextColor={colors.gray1}
          style={isPassword ? styles.inputWithEye : styles.input}
          onChangeText={setState}
          placeholder={placeholder}
          secureTextEntry={showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeContainer}
            onPress={handleEyeClick}
          >
            <Image
              resizeMode="contain"
              style={styles.eye}
              source={
                showPassword
                  ? require("../../../assets/icons/hidden.png")
                  : require("../../../assets/icons/eye.png")
              }
              {...props}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
