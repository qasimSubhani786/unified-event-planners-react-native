import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles, textStyle } from '../../screens/hall-detail/styles'
import { colors, fontFamily } from '../../common'
import { Checkbox, RadioButton } from 'react-native-paper'
import { horizontalItem } from '../../common/all-texts'

export const MenuItem = ({ isChecked, onItemSelects, featuredHall, title, url, subTitle, offer, type }) => {
  return (
    !featuredHall ? (
      <TouchableOpacity onPress={onItemSelects} style={styles.featureItemContainer} >
        <View style={styles.featureImageContainer} >
          <Image source={{ uri: url }} style={{ height: undefined, width: undefined, flex: 1, borderRadius: 20 }} resizeMode="cover" />
        </View>
        <Text style={[textStyle(colors.black, fontFamily.tommy, 14).text, { textAlign: "center" }]} >{title}</Text>
      </TouchableOpacity>) : (<View style={styles.menuItemContainer} >
        <View style={styles.menuItemImageContainer} >
          {offer && <View style={{ backgroundColor: colors.white, position: "absolute", zIndex: 100, top: 10, paddingHorizontal: 5, borderBottomRightRadius: 5, borderTopLeftRadius: 5 }} >
            <Text style={textStyle(colors.red2, fontFamily.tommyMedium, 8).text} >{offer}</Text>
          </View>}
          <Image source={{ uri: url }} style={{ height: undefined, width: undefined, flex: 1, borderRadius: 8 }} resizeMode="cover" />
        </View>
        <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 14).text, { textAlign: "center" }]} >{title}</Text>
        <Text style={textStyle(colors.gray2, fontFamily.tommyMedium, 10).text} >{subTitle}</Text>
        {type === horizontalItem.meal ? (
          <RadioButton.Android
            value="first"
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={onItemSelects}
            color={colors.primary}
          />) : (
          <Checkbox.Android
            status={isChecked ? 'checked' : 'unchecked'}
            color={colors.primary}
            onPress={onItemSelects}
          />)}
      </View>)
  )
}