import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../screens/meals/styles'
import { useSelector } from 'react-redux';
import { textStyle } from '../../screens/hall-detail/styles';
import { ALL_TEXTS, colors, fontFamily } from '../../common';
import _ from 'lodash'

export const MealItem = ({
  onItemPress,
  selected,
  onDetailsBtnPress,
  title,
  price,
  offer,
  image,
  items,
  addsOn,
  details
}) => {
  const selectedMealItemIds = useSelector((state: any) => state?.meals?.selectedMealItems)
  const defaultMealItems = _.map(items, ({ title, items }) => {
    let meal;
    for (let i = 0; i < selectedMealItemIds.length; i++) {
      const mealId = selectedMealItemIds[i];
      for (let j = 0; j < items.length; j++) {
        const mealItem = items[j];
        if (mealItem._id == mealId) {
          meal = mealItem
        }
      }
    }
    return ({
      title,
      defaultOption: meal ? meal.item : null,
    })
  });
  return (<TouchableOpacity onPress={onItemPress} style={selected ? styles.selectedItemContainer : styles.itemContainer} >
    {offer != '' && <View style={styles.offer} >
      <Text style={textStyle(colors.white, fontFamily.tommyBold, 12).text}>{offer}</Text>
    </View>}
    <View style={styles.itemImage} >
      <Image style={{ height: undefined, width: undefined, flex: 1, borderRadius: 8, borderWidth: 0 }} resizeMode='cover' source={{ uri: image }} />
    </View>
    <View style={styles.itemSecondaryContainer} >
      <Text style={[{ marginRight: 35 }, textStyle(colors.black, fontFamily.tommyMedium, 16).text, styles.itemTitle]} >{title}</Text>
      <View style={styles.detailTxtContainer} >
        <Text numberOfLines={selected ? 2 : 3} style={[textStyle(colors.black, fontFamily.tommyMedium, 13).text]} >Details:
          <Text style={[textStyle(colors.black, fontFamily.tommy, 12).text]} >{` ${details}`}</Text>
        </Text>
      </View>
      <View>
        {selected && <>
          <Text style={[{ marginTop: 5 }, textStyle(colors.black, fontFamily.tommyMedium, 14).text, styles.itemTitle]} >Menu Items</Text>
          {defaultMealItems.map((i) => (
            <View style={{ flexDirection: "row" }} >
              <Text style={[{ marginLeft: 10 }, textStyle(colors.black, fontFamily.tommyBold, 12).text, styles.itemTitle]} >{`\u2022 ${i.title}`}</Text>
              <Text style={[{ marginLeft: 2 }, textStyle(colors.black, fontFamily.tommy, 12).text, styles.itemTitle]} >{`(${i.defaultOption})`}</Text>
            </View>
          ))
          }
        </>}
        <Text style={[{ alignSelf: "flex-start", marginTop: 5 }, textStyle(colors.primary, fontFamily.tommyMedium, 14).text]} >{`Per Head ${price}/-`} </Text>
      </View>
      <View style={addsOn.length > 0 ? styles.bottomItemContainer : null} >
        {addsOn.length > 0 && <View>
          <Text style={[{ marginTop: 5 }, textStyle(colors.black, fontFamily.tommyMedium, 14).text, styles.itemTitle]} >Adds On</Text>
          {addsOn.map((i: any) => (
            <Text style={[{ marginLeft: 3 }, textStyle(colors.black, fontFamily.tommy, 12).text, styles.itemTitle]} >{`\u2022 ${i.title} (P/H:${i.price})`}</Text>
          ))
          }
        </View>}
        <TouchableOpacity onPress={onDetailsBtnPress} style={styles.detailBtn}>
          <Text style={styles.btnDetailText}>
            {ALL_TEXTS.BUTTON_TEXT.viewDetail}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>)
}


