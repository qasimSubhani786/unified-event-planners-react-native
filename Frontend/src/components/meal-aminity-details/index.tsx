import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { textStyle } from '../../screens/hall-detail/styles'
import { colors, fontFamily } from '../../common'
import { Button } from '../button'
import { RadioButton, Checkbox } from 'react-native-paper';
import { styles } from '../../screens/meals/styles'
import { BottomSheet } from '../bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedMealId, setSelectedMealItems, setSelectedAdsOnIds } from '../../utils/redux/slice/meals'
import _ from "lodash"
import { setTotalAmenityPrice, updateAmenityData } from '../../utils/redux/slice/amenities'

export function DetailsMenuBottomSheet({ refRBSheet, onClose }) {
  // meals
  const mealDetails = useSelector((state: any) => state?.meals?.menuDetailsData)
  const isMealMenu = useSelector((state: any) => state?.meals?.isMenuDetailPopupOpens)
  const selectedMealItemIds = useSelector((state: any) => state?.meals?.selectedMealItems)
  const mealId = useSelector((state: any) => state?.meals?.selectedMealId)
  const selectedMealAdsOnIds = useSelector((state: any) => state?.meals?.selectedAdsOnIds)

  // amenity
  const amenityDetails = useSelector((state: any) => state?.amenities?.amenityDetailsData)
  const isAmenityMenu = useSelector((state: any) => state?.amenities?.isAmenityDetailPopupOpens)
  const selectedAmenities = useSelector((state: any) => state?.amenities?.selectedAmenities)

  //local meal
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAdsOn, setSelectedAdsOn] = useState([])

  //local amenity
  const STANDARD_PKG = 'standard'
  const PREMIUM_PKG = 'premium'
  const [selectedPackage, setSelectedPackage] = useState(STANDARD_PKG)


  const toggleItemRadio = (payload: any) => {
    const items = payload?.items
    const newMealId = payload?.id
    const filteredArr1_ = selectedItems?.filter((value: any) => !items.includes(value));
    filteredArr1_?.push(newMealId)
    setSelectedItems(filteredArr1_)
  }

  const [menuDetailData, setMenuDetailData] = useState<any>({})

  const dispatch = useDispatch()
  useEffect(() => {
    if (isMealMenu && mealDetails) {
      if (mealId == mealDetails._id) {
        setSelectedItems(selectedMealItemIds)
        setSelectedAdsOn(selectedMealAdsOnIds)
      }
      setMenuDetailData(mealDetails)
    } else if (isAmenityMenu) {
      setMenuDetailData(amenityDetails)
      const amenityItem = selectedAmenities.find((item: any) => item.id == amenityDetails._id)
      if (amenityItem) {
        setSelectedPackage(amenityItem.package)
        setSelectedAdsOn(amenityItem.addsOn)

      }

    }
  }, [])

  const getPackageRates = (pkg: string) => {
    if (pkg == STANDARD_PKG) {
      return 1
    } else if (pkg == PREMIUM_PKG) {
      return 1.5
    } else {
      return 1.75
    }
  }

  const getPackagePrice = (price: number) => {
    if (selectedPackage == STANDARD_PKG) {
      return 1 * price
    } else if (selectedPackage == PREMIUM_PKG) {
      return 1.5 * price
    } else {
      return 1.75 * price
    }
  }

  const RadioItem = ({ text, isChecked, onRadioPress }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <RadioButton.Android
          value="first"
          status={isChecked ? 'checked' : "unchecked"}
          onPress={onRadioPress}
          color={colors.primary}
        />
        <Text style={[{ marginLeft: -2, marginRight: 20, textTransform: "capitalize" }, textStyle(colors.black, fontFamily.tommy, 14).text]} >{text}</Text>
      </View>
    )
  }

  const CheckBoxItem = ({ text, isChecked, price, onCheckPress }) => {
    return (
      <View style={styles.checkedItem} >
        <View style={{ flexDirection: "row", alignItems: "center" }} >
          <Checkbox.Android
            status={isChecked ? 'checked' : 'unchecked'}
            color={colors.primary}
            onPress={onCheckPress}
          />
          <Text style={[textStyle(colors.black, fontFamily.tommy, 15).text]} >{text}</Text>
        </View>
        <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 13).text]} >{price}</Text>
      </View>
    )
  }
  return (
    <BottomSheet onClose={onClose} reference={refRBSheet} >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.detailsContainer} >
        <View style={styles.detailsImageContainer} >
          <View style={styles.offer} >
            <Text style={textStyle(colors.white, fontFamily.tommyBold, 12).text}>Hot Deal</Text>
          </View>
          <Image source={{ uri: menuDetailData.image }} resizeMode='cover' style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} />
        </View>
        <View style={styles.detailsTopContainer} >
          <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 20).text]} >{menuDetailData.title} </Text>
          <Text style={[{}, textStyle(colors.primary, fontFamily.tommyMedium, 17).text]} >  {!isMealMenu ? `PKR:${getPackagePrice(menuDetailData.price)}/- ` : `Per Head ${menuDetailData.price}/- `}</Text>
        </View>

        <View>
          <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 16).text]} >Details</Text>
          <Text style={[textStyle(colors.black, fontFamily.tommy, 12).text]} >{menuDetailData?.details}</Text>
        </View>

        {/* Meal Section */}
        {isMealMenu ? (<View style={styles.detailsMenuItemContainer} >
          {menuDetailData?.mealItems?.map((item: any) => (
            <View style={styles.mt5} >
              <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 16).text]} >{item.title}</Text>
              <View style={styles.radioHorizontal} >
                {item?.items.map((i: any) => (
                  <RadioItem
                    onRadioPress={() => {
                      toggleItemRadio({ items: _.map(item.items, "_id"), id: i._id })
                    }
                    }
                    isChecked={selectedItems?.includes(i?._id)}
                    text={i?.item} />
                ))}
              </View>
            </View>
          ))
          }
        </View>) : (
          // Amenity Section
          <View style={styles.mt5} >
            <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 16).text]} >Package</Text>
            <View style={[styles.radioHorizontal, { justifyContent: "space-between", flexWrap: "wrap" }]} >
              {menuDetailData?.package?.map((i: any) => (
                <RadioItem
                  onRadioPress={() => {
                    setSelectedPackage(i)
                  }
                  }
                  isChecked={selectedPackage === i}
                  text={`${i} (x${getPackageRates(i)}) `} />
              ))}
            </View>
          </View>)}
        <View style={styles.adsOnContainer} >
          <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 20).text]} >Adds On</Text>
          {menuDetailData?.addsOn?.map((item: any) => (
            <CheckBoxItem
              text={item.title}
              isChecked={selectedAdsOn.includes(item._id)}
              price={`Price ${!isAmenityMenu ? 'PerHead' : ''} PKR:${item.price}/-`}
              onCheckPress={() => {
                if (!selectedAdsOn.includes(item._id)) {
                  const tempSelectedAdsOn = [...selectedAdsOn]
                  tempSelectedAdsOn.push(item._id)
                  setSelectedAdsOn(tempSelectedAdsOn)
                } else {
                  const tempSelectedAdsOn = [...selectedAdsOn]
                  const index = tempSelectedAdsOn.findIndex((i: any) => i == item._id)
                  if (index != -1) {
                    tempSelectedAdsOn.splice(index, 1)
                  }
                  setSelectedAdsOn(tempSelectedAdsOn)
                }
              }} />
          ))
          }
        </View>
      </ScrollView>
      <View style={styles.buttonContainer} >
        <Button text={"Select"}
          isDisable={isMealMenu ? selectedItems.length < 3 : false
          }
          onPress={() => {
            if (isMealMenu) {
              dispatch(setSelectedMealId(menuDetailData?._id))
              dispatch(setSelectedMealItems(selectedItems))
              dispatch(setSelectedAdsOnIds(selectedAdsOn))
            } else {
              dispatch(updateAmenityData({ id: menuDetailData?._id, package: selectedPackage, price: getPackagePrice(menuDetailData.price), addsOn: selectedAdsOn }))
              const addsOnData = menuDetailData?.addsOn?.filter((item: any) => selectedAdsOn?.includes(item._id))
              var addsOnDataSum = addsOnData.reduce(function (prev: number, cur: number) {
                return prev + cur?.price;
              }, 0);
              const amenityPrice = getPackagePrice(menuDetailData.price)
              const totalCost = amenityPrice + addsOnDataSum
              dispatch(setTotalAmenityPrice({ id: menuDetailData?._id, price: totalCost }))
            }
            refRBSheet?.current?.close()
          }} />
      </View>
    </BottomSheet>
  )
}