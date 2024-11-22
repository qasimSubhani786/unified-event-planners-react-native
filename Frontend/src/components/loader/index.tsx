import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../common';
import { styles } from './styles';

export const Loader = ({ color, size, dynmicStyle }) => {
  return (
    <View style={[styles.container, dynmicStyle]}>
      <ActivityIndicator size={size || 'large'} color={color || colors.gray2} />
    </View>
  );
};

export const ScreenLoader = ({ color, size, dynmicStyle }) => {
  return (
    <View style={[styles.screenContainer, dynmicStyle]}>
      <ActivityIndicator size={size || 'large'} color={color || colors.primary} />
    </View>
  );
};