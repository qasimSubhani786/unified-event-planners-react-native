import { SafeAreaView, View, Text, Image } from "react-native";
import { style } from "./style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Header, Input, ScreenLoader } from "../../components";
import { AirbnbRating } from "react-native-ratings";
import { Delete, Edit, Location } from "../../utils/svgs";
import { Search } from "../../utils/svgs";
import { useEffect, useState } from "react";
import { ALL_TEXTS, colors, fontFamily } from "../../common";
import { StackNavigation } from "../../constant/navigationType";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyHallsByEventQuery, useLazyHallsSearchQuery } from "../../utils/redux/slice/emptySplitApi";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../utils/redux/reducer/mainSlice";
import NotAvailable from "../../components/not-available";
import { textStyle } from "../hall-detail/styles";

const Venues = () => {
  const [getHallsByEvent, hallsByEventResponse] = useLazyHallsByEventQuery();
  const [hallSearchAPI, hallSearchResponse] = useLazyHallsSearchQuery()
  const route = useRoute();
  const { eventId, serchText } = route?.params || {};
  const navigation = useNavigation<StackNavigation>();
  const [showAllHallsList, setShowAllHallsList] = useState(false)
  const [hallsList, setHallsList] = useState([])
  const [searchedText, setSearchedText] = useState(serchText || "")
  const location = useSelector((state) => state.auth.location);
  const dispatch = useDispatch();

  const getLocation = async () => {
    let city = await AsyncStorage.getItem("city");
    let area = await AsyncStorage.getItem("area");
    if (area && city) {
      dispatch(setLocation(city + ", " + area));
    } else {
      dispatch(setLocation(""));
    }
  };



  useEffect(() => {
    getLocation();
    getVenues();
  }, [location]);

  useEffect(() => {
    if (!eventId && serchText != '') {
      getSearchedHalls(serchText, true)
    }
  }, [])

  const getSearchedHalls = async (text: any, isDeleteLocation) => {
    if (text != '' && text.length > 3) {
      isDeleteLocation && deleteLocation()
      setShowAllHallsList(false)
      let response = await hallSearchAPI(text)
      if (response && response.data.success) {
        let halls = response?.data?.data
        setHallsList(halls)
      }
    }

  }
  const getAllHalls = async () => {
    let response = await hallSearchAPI("")
    if (response && response.data.success) {
      let halls = response?.data?.data
      setHallsList(halls)
      setShowAllHallsList(false)
    }
  }


  let venuesData = hallsByEventResponse?.data?.data || [];

  const getVenues = async () => {
    if (eventId) {
      let response = await getHallsByEvent(eventId);
      if (response && response.data.success) {
        let halls = response?.data?.data
        if (location && halls.length != 0) {
          const area = location?.split(",")[1].trim().toLowerCase()
          halls = halls.filter((venue: any) => {
            return venue.address.toLowerCase().includes(area);
          });
        }
        setHallsList(halls)
      };

    }
  }

  const isLongTitle = (title) => {
    return title.length > 15; // You can adjust the character limit based on your preference
  };

  const deleteLocation = async () => {
    try {
      await AsyncStorage.removeItem("city");
      await AsyncStorage.removeItem("area");
      dispatch(setLocation(""));
      console.log("Items removed successfully");
    } catch (error) {
      console.error("Error removing items from local storage:", error);
    }
  };
  const isLoading = (hallsByEventResponse.isFetching || hallSearchResponse.isFetching)
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Header
          onBackPress={() => {
            if (serchText != "") {
              navigation.navigate(ALL_TEXTS.SCREEN_NAME.BOTTOM_TABS)
            } else {
              navigation.goBack()
            }
          }}
          backIcon
          text={ALL_TEXTS.HEADINGS.venueListing}
        />
        {location ? (
          <View style={style.locationContainer}>
            <View style={style.locationTextContainer}>
              <Text style={style.loactionText}>{location}</Text>
            </View>
            <TouchableOpacity style={style.editDelete} onPress={deleteLocation}>
              <Delete width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.editDelete}
              onPress={() =>
                navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOCATION, { eventId: eventId })
              }
            >
              <Edit height={30} width={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
        <View style={style.inputContainer}>
          <Input
            icons={<Search height={20} width={20} />}
            placeholder={"Search Here"}
            value={searchedText || ""}
            setState={(e) => {
              setSearchedText(e)
              if (e.length > 3) {
                getSearchedHalls(e, serchText?.length > 1 ? true : false)
              }
              if (e.length === 0) {
                setShowAllHallsList(true)
              }
            }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}  >
          {isLoading ? (
            <ScreenLoader />
          ) : (hallsList?.length == 0 ? <NotAvailable customStyle={{ marginTop: 50 }} text={'There is no availabe hall recently under selected category'} /> :
            hallsList?.map((venue) => (
              <View style={style.card} key={venue._id}>
                <View
                  style={[
                    style.cardImageConatianer,
                    {
                      maxWidth:  "100%",
                      height: isLongTitle(venue.title) ? "auto" : 117,
                    },
                  ]}
                >
                  <Image
                    style={style.cardImage}
                    source={{
                      uri: venue.majorImage,
                    }}
                  />
                </View>
                <View style={style.cardDetail}>
                  <Text style={style.cardTitle}>{venue.title + ""}</Text>
                  <View style={style.venueLocationContainer}>
                    <View>
                      <Location height={20} width={20} />
                    </View>
                    <View>
                      <Text style={style.venueLocationText}>
                        {venue.address}
                      </Text>
                    </View>
                  </View>
                  <View style={style.ratingContainer}>
                    <AirbnbRating
                      count={5}
                      defaultRating={venue.rating}
                      size={20}
                      isDisabled={true}
                      showRating={false}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME_DETAIL, {
                          title: venue?.title,
                          id: venue?._id,
                        })
                      }
                      style={style.detailBtn}
                    >
                      <Text style={style.btnDetailText}>
                        {ALL_TEXTS.BUTTON_TEXT.viewDetail}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
          {!isLoading && showAllHallsList && <TouchableOpacity onPress={getAllHalls} >
            <Text style={[textStyle(colors.primary, fontFamily.tommyBold, 15).text, { textAlign: "center", marginTop: 20 }]}  >Show All Halls</Text></TouchableOpacity>}
        </ScrollView>
      </View >
    </SafeAreaView >
  );
};

export default Venues;
