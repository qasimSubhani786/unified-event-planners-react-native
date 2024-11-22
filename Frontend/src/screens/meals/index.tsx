import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { DetailsMenuBottomSheet, Header, MealItem, ScreenLoader } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { textStyle } from '../hall-detail/styles'
import { ALL_TEXTS, colors, fontFamily } from '../../common'
import { useLazyGetHallMealsQuery } from '../../utils/redux/slice/emptySplitApi'
import _ from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { setIsMenuDetailPopupOpens, setMenuDetailsData, setSelectedMealId, setSelectedMealItems } from '../../utils/redux/slice/meals'






export default function Meals({ route }) {
  const refRBSheet: any = useRef();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [hallMealsAPI, hallMealsResponse] = useLazyGetHallMealsQuery()
  const mealId = useSelector((state: any) => state?.meals?.selectedMealId)
  const mealPopUpOpens = useSelector((state: any) => state?.meals?.isMenuDetailPopupOpens)
  const selectedMealAdsOn = useSelector((state: any) => state?.meals?.selectedAdsOnIds)

  useEffect(() => {
    fetchMeals()
  }, [])

  const fetchMeals = async () => {
    await hallMealsAPI(route.params.hallId)
  }

  const mealsItems = hallMealsResponse?.data?.data?.meals


  const getSelectedAdsOn = (items: any, selectedItems: any) => {
    const selectedAdsOn = items.filter(({ _id }) => selectedItems.includes(_id))
    return selectedAdsOn
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header text={'Meals'} onBackPress={() => navigation.goBack()} backIcon />
      {hallMealsResponse.isFetching ? <ScreenLoader /> : <View style={styles.container} >
        <View style={styles.toptextContainer} >
          <Text style={textStyle(colors.black, fontFamily.tommyBold, 19).text} >Hot Deals</Text>
          <Text style={textStyle(colors.black, fontFamily.tommy, 15).text} >You can Customise your Deal </Text>
          <Text style={textStyle(colors.primary, fontFamily.tommy, 13).text}>(Select any one Deal)</Text>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
          data={mealsItems}
          renderItem={({ item, index }) => (
            <MealItem
              title={item.title}
              price={item.price}
              offer={item.offer}
              image={item.image}
              items={item.mealItems}
              details={item.details}
              onDetailsBtnPress={async () => {
                await dispatch(setMenuDetailsData(item))
                await dispatch(setIsMenuDetailPopupOpens(true))
                refRBSheet?.current?.open()
              }}
              selected={mealId == item._id}
              addsOn={mealId == item._id ? getSelectedAdsOn(item.addsOn, selectedMealAdsOn) : []}
              onItemPress={() => {
                if (mealId != item._id) {
                  dispatch(setSelectedMealId(item._id))
                  const defaultMealItems = _.map(item.mealItems, ({ items }) => (
                    _.head(items)._id
                  ));
                  dispatch(setSelectedMealItems(defaultMealItems))
                }

              }} />
          )}
        />
      </View>}
      {mealPopUpOpens && <DetailsMenuBottomSheet refRBSheet={refRBSheet} onClose={() => {
        dispatch(setIsMenuDetailPopupOpens(false))
      }} />}
    </SafeAreaView>
  )
}