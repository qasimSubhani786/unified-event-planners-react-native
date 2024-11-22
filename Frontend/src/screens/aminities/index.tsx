import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { DetailsMenuBottomSheet, Header, ScreenLoader } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { textStyle } from '../hall-detail/styles'
import { ALL_TEXTS, colors, fontFamily } from '../../common'
import { useLazyGetHallAmenityQuery, useLazyGetHallMealsQuery } from '../../utils/redux/slice/emptySplitApi'
import _ from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { setIsAmenityDetailPopupOpens, setAmenityDetailsData } from '../../utils/redux/slice/amenities'
import { toggleAmenity } from '../../utils/redux/slice/amenities'

export default function Aminity({ route }) {
  const refRBSheet: any = useRef();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [hallAminetyAPI, hallAminetyResponse] = useLazyGetHallAmenityQuery()

  const amenityPopUpOpens = useSelector((state: any) => state?.amenities?.isAmenityDetailPopupOpens)
  const selectedAmenitiy = useSelector((state: any) => state?.amenities?.selectedAmenities)
  const aminity_package = useSelector((state: any) => state?.amenities?.aminity_package)

  useEffect(() => {
    fetchMeals()
  }, [])

  const fetchMeals = async () => {
    await hallAminetyAPI(route.params.hallId)
  }

  const amenityItems = hallAminetyResponse?.data?.data?.aminities

  const MealItem = ({
    selected,
    onDetailsBtnPress,
    title,
    price,
    offer,
    image,
    addsOn,
    pkg,
    details,
    onAmenitySelect,
    selectedAmenityData
  }) => {
    const addsOnData = addsOn.filter((item: any) => selectedAmenityData?.addsOn?.includes(item._id))
    var addsOnDataSum = addsOnData.reduce(function (prev: number, cur: number) {
      return prev + cur?.price;
    }, 0);
    const amenityPrice = selectedAmenityData?.price || price
    const totalCost = amenityPrice + addsOnDataSum
    return (<TouchableOpacity onPress={onAmenitySelect} style={selected ? styles.selectedItemContainer : styles.itemContainer} >
      {offer != '' && <View style={styles.offer} >
        <Text style={textStyle(colors.white, fontFamily.tommyBold, 12).text}>{offer}</Text>
      </View>}
      <View style={styles.itemImage} >
        <Image style={{ height: undefined, width: undefined, flex: 1, borderRadius: 8, borderWidth: 0 }} resizeMode='cover' source={{ uri: image }} />
      </View>
      <View style={styles.itemSecondaryContainer} >
        <Text style={[{ marginRight: 35 }, textStyle(colors.black, fontFamily.tommyMedium, 16).text, styles.itemTitle]} >{title}</Text>
        <View>
          <Text numberOfLines={2} style={[textStyle(colors.black, fontFamily.tommy, 12).text, styles.itemTitle]} >{`${details}`}</Text>
          <Text style={[{ marginTop: 5 }, textStyle(colors.black, fontFamily.tommyMedium, 13).text, styles.itemTitle]} >{`Package:`}
            <Text style={[{ textTransform: "capitalize" }, textStyle(colors.black, fontFamily.tommy, 13).text, styles.itemTitle]} >{`${selectedAmenityData?.package || pkg}`}</Text>
            <Text style={[{ alignSelf: "flex-start", marginTop: 5 }, textStyle(colors.primary, fontFamily.tommyMedium, 10).text]} >{` (PKR:${amenityPrice})`} </Text>
          </Text>
        </View>
        <View style={addsOn.length > 0 ? styles.bottomItemContainer : null} >
          {selectedAmenityData?.addsOn?.length > 0 && <View>
            <Text style={[{ marginTop: 5 }, textStyle(colors.black, fontFamily.tommyMedium, 12).text, styles.itemTitle]} >Adds On</Text>
            {addsOnData?.map((i: any) => (
              <Text style={[{ marginLeft: 3 }, textStyle(colors.black, fontFamily.tommyMedium, 10).text, styles.itemTitle]} >{`\u2022 ${i.title} (PKR:${i.price})`}</Text>
            ))
            }
          </View>}
          <View style={styles.menuItemBtnContainer} >
            <View >
              <Text style={[{ marginLeft: 3 }, textStyle(colors.primary, fontFamily.tommyMedium, 14).text, styles.itemTitle]} >{`Total Price:${totalCost}`}</Text>
            </View>
            <TouchableOpacity onPress={onDetailsBtnPress} style={styles.detailBtn}>
              <Text style={styles.btnDetailText}>
                {ALL_TEXTS.BUTTON_TEXT.viewDetail}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </TouchableOpacity>)
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header text={'Aminities'} onBackPress={() => navigation.goBack()} backIcon />
      {hallAminetyResponse.isFetching ? <ScreenLoader /> : <View style={styles.container} >
        <View style={styles.toptextContainer} >
          <Text style={textStyle(colors.black, fontFamily.tommyBold, 19).text} >Event Essentials</Text>
          <Text style={textStyle(colors.black, fontFamily.tommy, 15).text} >Personalize Your Ideal Package </Text>
          <Text style={textStyle(colors.primary, fontFamily.tommy, 13).text}>(Select Package)</Text>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
          data={amenityItems}
          renderItem={({ item, index }) => (
            <MealItem
              title={item.title}
              price={item.price}
              offer={item.offer}
              image={item.image}
              pkg={item.package[0]}
              details={item.details}
              onDetailsBtnPress={async () => {
                await dispatch(setAmenityDetailsData(item))
                await dispatch(setIsAmenityDetailPopupOpens(true))
                refRBSheet?.current?.open()
              }}
              selected={selectedAmenitiy.findIndex((i: any) => item._id == i.id) != -1}
              selectedAmenityData={selectedAmenitiy.find((i: any) => item._id == i.id)}
              addsOn={item?.addsOn || []}
              onAmenitySelect={() => {
                dispatch(toggleAmenity({ id: item._id, package: "standard", price: item.price, addsOn: [] }))
              }} />
          )}
        />
      </View>}
      {amenityPopUpOpens && <DetailsMenuBottomSheet refRBSheet={refRBSheet}
        onClose={() => {
          dispatch(setIsAmenityDetailPopupOpens(false))
        }} />}
    </SafeAreaView>
  )
}