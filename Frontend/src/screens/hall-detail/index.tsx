import { View, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView, FlatList, Linking, Platform, ToastAndroid } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Header, MenuSelectionContainer, ScreenLoader } from '../../components'
import { styles, textStyle } from './styles'
import Carousel from 'react-native-snap-carousel';
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { ALL_TEXTS, colors, fontFamily } from '../../common';
import StarRating from 'react-native-star-rating';
import { BookNow } from '../../utils/svgs';
import { useAddHallBookingMutation, useLazyGetHallDetailsQuery, useLazyGetHallReviewsQuery, useMarkHallasFavoriteMutation } from '../../utils/redux/slice/emptySplitApi';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constant/navigationType';
import { useDispatch, useSelector } from 'react-redux';
import AddReview from '../add-review';
import RBSheet from 'react-native-raw-bottom-sheet';
import { emptyMeals, setSelectedMealId, setSelectedMealItems } from '../../utils/redux/slice/meals';
import { emptyAmenities, toggleAmenity } from '../../utils/redux/slice/amenities';
import _ from "lodash"
import { setSelectedDate } from '../../utils/redux/slice/check-availability';
import { horizontalItem } from '../../common/all-texts';

export default function HallDetails({ route }) {
  const navigation = useNavigation<StackNavigation>();
  const userInfo = useSelector((state: any) => state?.auth?.user)
  const dispatch = useDispatch()
  const carouselRef = useRef(null);

  const [hallDetailsAPI, hallDetailsResponse] = useLazyGetHallDetailsQuery()
  const [hallReviewsAPI, hallReviewsResponse] = useLazyGetHallReviewsQuery()

  const [bookHallAPI, bookHallResponse] = useAddHallBookingMutation()
  const [hallReviews, setHallReviews] = useState([])


  const mealId = useSelector((state: any) => state?.meals?.selectedMealId)
  const selectedMealItems = useSelector((state: any) => state?.meals?.selectedMealItems)
  const selectedMealAdsOnIds = useSelector((state: any) => state?.meals?.selectedAdsOnIds)

  const selectedAmenitiy = useSelector((state: any) => state?.amenities?.selectedAmenities)
  const hallAvailableDate = useSelector((state: any) => state?.hallAvailability?.selectedDate)
  const hallDetailsData = hallDetailsResponse?.data?.data || {}
  const [isFav, setIsFav] = useState(false)
  const selectedHallId = route.params.id

  function reverse_(array) {
    return array.map((item, idx) => array[array.length - 1 - idx])
  }
  const fetchHallDetails = async (id: any) => {
    let response = await hallDetailsAPI(id)
    if (response && response.data.success) {
      const { data: { data: { reviews } } } = response
      setHallReviews(reverse_(reviews))
    }
    dispatch(emptyMeals(null))
    dispatch(emptyAmenities(null))
    dispatch(setSelectedDate(null))
  }

  useEffect(() => {
    setIsFav(hallDetailsData?.isFav)
  }, [hallDetailsData])

  useEffect(() => {
    const id = route.params.id
    fetchHallDetails(id)
  }, [selectedHallId])

  const fetchHallReviews = async () => {
    let response = await hallReviewsAPI(selectedHallId)
    if (response && response.data.success) {
      const { data: { data } } = response
      setHallReviews(reverse_(data))
    }
  }


  const { width: screenWidth } = Dimensions.get('window');

  const formatTime = (dateTimeString) => {
    const temp = new Date(dateTimeString);
    return `${temp.getFullYear()}-${String(temp.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(temp.getDate()).padStart(2, "0")}`;
  };
  const [favoriteAPI, favoriteResponse] = useMarkHallasFavoriteMutation()
  const socialMedia = {
    FaceBook: { id: 1, icon: <AntDesign name="facebook-square" size={20} color={colors.white} />, color: colors.primary },
    Instagram: { id: 2, icon: <AntDesign name="instagram" size={20} color={colors.white} />, color: colors.insta },
    Whatsapp: { id: 3, icon: <FontAwesome name="whatsapp" size={20} color={colors.white} />, color: colors.green },
    Twitter: { id: 4, icon: <AntDesign name="twitter" size={20} color={colors.white} />, color: colors.blue2 },
    Tiktok: { id: 5, icon: <FontAwesome5 name="tiktok" size={20} color={colors.white} />, color: colors.black },
  }
  function getSocialKeyById(id: any) {
    for (const key in socialMedia) {
      if (socialMedia[key].id === id) {
        return key;
      }
    }
    return ''; // Return null if the id doesn't match any key in the object
  }
  function getSocialValueById(id: any) {
    for (const key in socialMedia) {
      if (socialMedia[key].id === id) {
        return socialMedia[key];
      }
    }
    return ''; // Return null if the id doesn't match any key in the object
  }

  const onBookingHandler = async () => {
    if (userInfo && userInfo?.token != '') {
      const selectedAmenities = _.map(selectedAmenitiy, ({ id, package: amenityPkg, addsOn }) => ({
        aminity: id,
        package: amenityPkg,
        addOn: addsOn
      }))
      const selectedMeal = {
        meal: mealId,
        items: selectedMealItems,
        addsOn: selectedMealAdsOnIds
      }
      const bookingInfo = {
        date: hallAvailableDate.date?.split("T")[0], // temporary
        shift: hallAvailableDate.shift, // temporary
        hall: route?.params?.id,
        status: "pending", // its remain fixed
        aminities: selectedAmenities,
        meals: selectedMeal
      }
      let response: any = await bookHallAPI(bookingInfo)
      if (response && response.data.success) {
        navigation.navigate(ALL_TEXTS.SCREEN_NAME.CONFIRMATION_SCREEN, { bookingId: response?.data?.data?._id })
      }
      // Alert.alert("Booking Section Coming Soon!")
    } else {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)
      ToastAndroid.show("You must be Login first in order to Book Hall!", ToastAndroid.SHORT)
    }
  }

  const onFavoriteHallHandler = async () => {
    if (userInfo && userInfo?.token != '') {
      const id = route.params?.id || ""
      setIsFav(!isFav)
      const response: any = await favoriteAPI({
        hallId: id,
        isFavorite: !isFav
      })
      if (response && response.data.success) {
        ToastAndroid.show(`${route.params.title || 'Hall'} mark as  ${!isFav ? "Favorite" : "Unfavorite"}`, ToastAndroid.SHORT)
      }
    } else {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)
      ToastAndroid.show("You must be Login first in order to Favorite Hall!", ToastAndroid.SHORT)
    }
  }

  const onAddReviewButtonPress = () => {
    if (userInfo && userInfo?.token != '') {
      this.RBSheet.open()
    } else {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOGIN)
      ToastAndroid.show("You must be Login first in order to Favorite Hall!", ToastAndroid.SHORT)
    }

  }

  const openMaps = (latitude: any, longitude: any) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${parseFloat(latitude)},${parseFloat(longitude)}`;
    const label = route.params.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const onSocialMediaClick = async (id: any, handle: any) => {
    switch (parseInt(id)) {
      case socialMedia.FaceBook.id:
        try {
          const facebookAppUrl = `fb://facewebmodal/f?href=${encodeURIComponent(handle)}`;
          
          if (Platform.OS === 'android') {
            // On Android, try opening the Facebook app first
            const canOpenFacebookApp = await Linking.canOpenURL(facebookAppUrl);
            if (canOpenFacebookApp) {
              return Linking.openURL(facebookAppUrl);
            }
          }
          
          // If Facebook app is not available on Android or on iOS, open in Chrome or the default browser
          return Linking.openURL(handle);
        } catch (error) {
          console.error('An error occurred:', error);
        }        break;
      case socialMedia.Whatsapp.id:
        Linking.openURL(`whatsapp://send?text=Can yoy Please Send Me Details of ${route.params.title}? &phone=${handle}`);
        break;
      case socialMedia.Instagram.id:
        Linking.openURL(handle)
      // case socialMedia.Instagram.id:
      //   Linking.openURL(`whatsapp://send?text=Can yoy Please Send Me Details of ${route.params.title}? &phone=${handle}`);
      //   break
      // rest will be implemented Latar on
      default:
        break;
    }
  }


  const renderItem = ({ item, index }) => {
    const goForward = () => {
      carouselRef.current.snapToNext();
    };
    const goBackward = () => {
      carouselRef.current.snapToPrev();
    };
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={goBackward} style={[styles.arrowIcon, { left: 10 }]} >
          <AntDesign name="left" size={25} color={colors.gray3} />
        </TouchableOpacity>
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
        <TouchableOpacity onPress={goForward} style={[styles.arrowIcon, { right: 10 }]} >
          <AntDesign name="right" size={25} color={colors.gray3} />
        </TouchableOpacity>
      </View>
    );
  };


  const SocialItem = ({ text, icon, color, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.socialItem, { backgroundColor: color }]} >
        {icon}
        <Text style={[textStyle(colors.white, fontFamily.tommyMedium, 12).text, { marginLeft: 5 }]} >{text} </Text>
      </TouchableOpacity>
    )

  }

  const RatingItem = ({ userName, rating, date, details }) => {
    return (
      <>
        <View style={styles.ratingUpperContainer} >
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rating}
            fullStarColor={colors.yellow}
            containerStyle={{ width: 100 }}
            starSize={25}
            starStyle={{ marginHorizontal: 3 }}
          />
          <Text style={textStyle(colors.black, fontFamily.tommy, 12).text} >
            {date}
          </Text>
        </View>
        <View>
          <Text style={textStyle(colors.gray2, fontFamily.tommy, 12).text} >
            {details}
          </Text>
          <Text style={[textStyle(colors.black, fontFamily.tommyMedium, 14).text, { marginTop: 8 }]} >
            {`By:${userName}`}
          </Text>
        </View>
      </>
    )
  }

  const AvailableTimeContainer = () => {
    return (
      <View style={styles.otherContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTxt}>Date: </Text>
          <Text style={styles.date}>{formatTime(hallAvailableDate.date)}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeTxt}>Available Time: </Text>
          <Text style={styles.time}>{hallAvailableDate.time}</Text>
        </View>
        <View style={styles.status}>
          {hallAvailableDate.shift == "morning" && (
            <Text style={styles.statusTxt}>{hallAvailableDate.shift}</Text>
          )}
          {hallAvailableDate.shift == "evening" && (
            <Text style={styles.statusOranger}>{hallAvailableDate.shift}</Text>
          )}
          {hallAvailableDate.shift == "night" && (
            <Text style={styles.statusRed}>{hallAvailableDate.shift}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => {
          navigation.navigate(ALL_TEXTS.SCREEN_NAME.CHECK_AVAILABILITY,
            { hallId: hallDetailsData?._id })
        }} style={styles.editDateContianer} >
          <MaterialIcons name="edit" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>)
  }

  return (
    <SafeAreaView style={styles.wrapper} >
      <Header onBackPress={() => navigation.goBack()} backIcon text={route.params.title} />
      {hallDetailsResponse.isFetching ? <ScreenLoader /> :
        <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 10 }}>
          <View style={styles.container}>
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth - 10}
              sliderHeight={250}
              itemWidth={screenWidth - 75}
              data={hallDetailsData?.images}
              renderItem={renderItem}
              layout={'default'}
              loop
            />
            <View style={styles.promotionBadge} >
              <Text style={textStyle(colors.white, fontFamily.tommyBold, 14).text} >{hallDetailsData?.offer}</Text>
            </View>
            <View style={[styles.titleContainer, styles.mt10]} >
              <Text style={textStyle(colors.black, fontFamily.tommyMedium, 22).text} >{hallDetailsData?.title}</Text>
              <AntDesign disabled={favoriteResponse.isLoading} onPress={onFavoriteHallHandler} name={isFav ? "heart" : "hearto"} size={24} color={isFav ? colors.red2 : colors.gray2} />
            </View>
            <View style={[styles.titleContainer, styles.mt10]} >
              <View style={{ flexDirection: "row", alignItems: 'flex-start', flex: 1 }}>
                <EvilIcons name="location" size={30} color={colors.primary} />
                <Text style={textStyle(colors.gray2, fontFamily.tommy, 12).text} >
                  {hallDetailsData?.address}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openMaps(hallDetailsData?.location[0], hallDetailsData?.location[1])} style={styles.mapbtnContainer} >
                <FontAwesome name="map-marker" size={18} color={colors.white} style={{ marginRight: 5 }} />
                <Text style={textStyle(colors.white, fontFamily.tommy, 12).text} > View on Map</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mt10} >
              <Text style={textStyle(colors.black, fontFamily.tommy, 13).text} >
                {hallDetailsData?.desc}
              </Text>
            </View>
            <View style={[styles.mt10, { flexDirection: "row", alignItems: "center" }]} >
              <Text style={textStyle(colors.black, fontFamily.tommyMedium, 18).text} >
                Hall Capacity:
              </Text>
              <Text style={[textStyle(colors.black, fontFamily.tommy, 16).text, { marginLeft: 5 }]} >
                {`${hallDetailsData?.capacity} Persons`}
              </Text>
            </View>
          </View>
          <View style={styles.menuSeelctionContainer} >
            <MenuSelectionContainer
              selectedItem={mealId}
              onItemSelected={(id: any, item: any) => {
                const defaultMealItems = _.map(item.mealItems, ({ items }) => (
                  _.head(items)._id
                ));
                dispatch(setSelectedMealId(id))
                dispatch(setSelectedMealItems(defaultMealItems))
              }}
              onViewAllPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.MEALS,
                {
                  hallId: route?.params?.id,
                })}
              type={horizontalItem.meal}
              items={hallDetailsData?.meals}
              sideIcons={hallDetailsData?.meals?.length > 3}
              title={'Select Your Meal*'} />
            <View style={styles.mt10} />
            <MenuSelectionContainer
              selectedItem={selectedAmenitiy}
              onItemSelected={(id: any, item: any) => {
                dispatch(toggleAmenity({ id: id, package: "standard", price: item.price, addsOn: [] }))
              }}
              onViewAllPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.AMINITY,
                {
                  hallId: route?.params?.id,
                })}
              type={horizontalItem.aminity}
              items={hallDetailsData?.aminities}
              sideIcons={hallDetailsData?.aminities?.length > 3}
              title={'Select Your Aminities'} />
          </View>
          <View style={styles.m10}>
            <Text style={textStyle(colors.black, fontFamily.tommyMedium, 18).text} >
              Availability
            </Text>
            {hallAvailableDate !== null ? <AvailableTimeContainer /> : <Button
              customStyle={{ alignSelf: "flex-start", marginTop: 10, height: undefined, padding: 10, }}
              text={'Check Availability'}
              onPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.CHECK_AVAILABILITY,
                { hallId: hallDetailsData?._id })}
            />}
          </View>
          <View style={styles.m10}>
            <Text style={textStyle(colors.black, fontFamily.tommyMedium, 18).text} >
              Social Media
            </Text>
            <View style={styles.socialContainer} >
              {
                hallDetailsData?.socialMedia?.map(i => (
                  <SocialItem onPress={() => onSocialMediaClick(i.socialId, i.handle)} text={getSocialKeyById(parseInt(i.socialId))} icon={getSocialValueById(parseInt(i.socialId)).icon} color={getSocialValueById(parseInt(i.socialId)).color} />
                ))
              }
            </View>
          </View>
          <View style={styles.menuSeelctionContainer} >
            <MenuSelectionContainer sideIcons={false} title={'Featured Halls'} featuredHall items={hallDetailsData?.featureHalls} />
          </View>
          <View style={styles.reviewContainer} >
            <View style={styles.mt10} />
            <Text style={textStyle(colors.black, fontFamily.tommyMedium, 18).text} >
              Reviews
            </Text>
            <View style={styles.addReviewContainer} >
              <View style={[styles.topTitleContainer, { paddingVertical: 10 }]} >
                <Text style={textStyle(colors.black, fontFamily.tommy, 16).text} >
                  What People are Saying
                </Text>
                <TouchableOpacity onPress={onAddReviewButtonPress}>
                  <Text
                    style={textStyle(colors.primary, fontFamily.tommy, 14).text}
                  >
                    Add Review
                  </Text>
                </TouchableOpacity>
                <RBSheet
                  ref={(ref) => {
                    this.RBSheet = ref;
                  }}
                  height={500}
                  openDuration={250}
                  customStyles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30
                    },
                  }}
                >
                  <AddReview onRevirewAdded={fetchHallReviews} venueName={route.params.title} id={hallDetailsData._id} />
                </RBSheet>
              </View>
              <View style={{ maxHeight: 250, }} >
                <FlatList
                  data={hallReviews}
                  nestedScrollEnabled
                  contentContainerStyle={{ paddingBottom: 20 }}
                  renderItem={({ item }) => (
                    <RatingItem userName={item.userName} rating={item.rating} details={item.details} date={item.date?.split("T")[0]} />
                  )}
                />
              </View>
            </View>
          </View>
          {(mealId == '' || hallAvailableDate == null)&&<Text style={styles.bookErr}>Please Select one meal and your desired date to Book venue </Text>}

          <View style={styles.bottomButtonsContainer} >
            <View style={styles.btnContainer} >
              <Button onPress={() => {
                Linking.openURL(`tel:${hallDetailsData?.contactNo}`)
              }} icon={<SimpleLineIcons name="phone" size={24} color={colors.white} style={{ marginLeft: 5 }} />} customStyle={{ marginRight: 5, flexDirection: "row", }} text={"Contact Us"} />
            </View>
            <View style={styles.btnContainer} >
              <Button
                loader={bookHallResponse?.isLoading}
                onPress={onBookingHandler}
                icon={<BookNow size={24} color={colors.white} style={{ marginLeft: 5 }} />}
                customStyle={{ marginLeft: 5, flexDirection: "row" }}
                text={'Book Now'}
                isDisable={(mealId == '' || hallAvailableDate == null)}
              />
            </View>
          </View>
        </ScrollView>}
    </SafeAreaView>
  )
}