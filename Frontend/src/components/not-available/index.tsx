import { View, Text } from 'react-native'
import React from 'react'
import { colors, fontFamily } from '../../common'

export default function NotAvailable({ text, customStyle }) {
  return (
    <View
      style={[{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: "50%",
        alignSelf: "center",
      }, customStyle]}
    >
      <Text style={{ textAlign: "center", fontFamily: fontFamily.tommyMedium, color: colors.black }}  >{text} </Text>
    </View>
  )
}