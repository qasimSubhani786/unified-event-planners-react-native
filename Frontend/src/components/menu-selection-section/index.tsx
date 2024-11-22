import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { styles, textStyle } from '../../screens/hall-detail/styles'
import { ALL_TEXTS, colors, fontFamily } from '../../common'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { horizontalItem } from '../../common/all-texts'
import { MenuItem } from '../menu-item'

export const MenuSelectionContainer = ({ title, sideIcons, featuredHall, onViewAllPress, items, type, onItemSelected, selectedItem }) => {
  const navigation = useNavigation()
  const amenityTotal = useSelector((state: any) => state?.amenities?.totalAmenityPrice)


  return (
    <View>
      <View style={styles.topTitleContainer} >
        <Text style={textStyle(colors.black, fontFamily.tommy, 22).text} >
          {title}
        </Text>
        {!featuredHall && <TouchableOpacity onPress={onViewAllPress} >
          <Text style={textStyle(colors.primary, fontFamily.tommy, 14).text}  >
            Customize
          </Text>
        </TouchableOpacity>}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {sideIcons && <AntDesign name="left" size={24} style={{ marginLeft: -15 }} color={colors.gray2} />}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items?.map((i: any, index: any) => {
            const price = (type == horizontalItem.aminity) && amenityTotal.find((j) => j.id == i._id)
            return (
              <MenuItem
                key={index}
                title={i.title}
                offer={i?.offer}
                subTitle={type == horizontalItem.meal ? `PKR ${i.price} Per Head` : `PKR ${price?.price || i.price}/-`}
                url={featuredHall ? i.images[0] : i.image}
                isChecked={type == horizontalItem.meal ? selectedItem == i._id : selectedItem?.some((item: any) => item.id == i._id)}
                onItemSelects={() => {
                  if (featuredHall) {
                    navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME_DETAIL, {
                      title: i?.title,
                      id: i?._id,
                    })
                  } else {
                    onItemSelected(i._id, i)
                  }
                }}
                featuredHall={!featuredHall}
                type={type}
              />
            )
          })
          }
        </ScrollView>
        {sideIcons && <AntDesign name="right" size={24} color={colors.gray2} style={{ marginRight: -15 }} />}
      </View>
    </View>
  )
}