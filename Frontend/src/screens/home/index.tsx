import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./style";
import { ALL_TEXTS, colors } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../constant/navigationType";
import { Header, ScreenLoader } from "../../components";
import { Input } from "../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { HomeStars } from "../../utils/svgs";
import {
  useLazyGetEventsQuery,
  useLazyGetHighlightsQuery,
} from "../../utils/redux/slice/emptySplitApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ }) => {
  const navigation = useNavigation<StackNavigation>();
  const [highlightsAPI, highlightsResponse] = useLazyGetHighlightsQuery();
  const [eventsAPI, eventsResponse] = useLazyGetEventsQuery();
  const [searchText, setsearchText] = useState("")
  const carouselRef = useRef(null);
  const { width: screenWidth } = Dimensions.get("window");

  useEffect(() => {
    getHighlights();
    getEvents();
  }, []);

  const getHighlights = async () => {
    await highlightsAPI(null);
  };
  const getEvents = async () => {
    await eventsAPI(null);
  };

  const navigateToPage = async (id) => {
    let city = await AsyncStorage.getItem("city");
    let area = await AsyncStorage.getItem("area");
    if (city && area) {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.VENUES, { eventId: id })
    } else {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOCATION, { eventId: id })
    }
  };
  const entries = highlightsResponse?.data?.data;
  const events = eventsResponse?.data?.data || [];
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.sliderItem}>
          <Text numberOfLines={1} style={styles.sliderItemText}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
  const EventItem = ({ uri, text, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.eventItemWrapper}
        activeOpacity={0.8}
      >
        <View style={styles.eventImage}>
          <Image
            style={styles.eventImage_}
            resizeMode="cover"
            source={{
              uri: uri,
            }}
          />
        </View>
        <View style={styles.eventItemTextContainer} >
          <Text style={styles.eventItemText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header text={"Unified Planners"} />
      {eventsResponse.isFetching ? (
        <ScreenLoader />
      ) : (
        <ScrollView style={styles.m10}>
          <View style={styles.screenContainer_}>
            <Input
              placeholder={"Search Venue by adress or title"}
              value={searchText}
              icons={
                <Ionicons
                  name="search-outline"
                  size={24}
                  color={colors.gray3}
                />
              }
              setState={setsearchText}
              onSubmitEditing={() => {
                navigation.navigate(ALL_TEXTS.SCREEN_NAME.VENUES, {
                  serchText: searchText
                })
              }}
            />
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth - 10}
              sliderHeight={screenWidth - 100}
              itemWidth={screenWidth - 75}
              data={entries}
              renderItem={renderItem}
              hasParallaxImages={true}
              autoplay
              loop
            />
          </View>
          <View style={styles.mt10}>
            <Text style={styles.manageTitle}>
              {ALL_TEXTS.TEXTS.MANAGE_EVENTS}
            </Text>
            <View style={styles.secondaryContainer}>
              <TouchableOpacity style={styles.upcomingEventBox}>
                <View style={styles.upEventBox}>
                  <View
                    style={{
                      backgroundColor: colors.white,
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.eventCount}>{`${events?.length - 1
                      }+`}</Text>
                  </View>
                  <HomeStars style={styles.stars} />
                </View>
                <View style={styles.eventTextContainer}>
                  <Text style={styles.eventText}>Upcoming Events</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.eventItems}>
                {events?.slice(0, 4).map((i) => (
                  <EventItem
                    uri={i.image}
                    text={i.title}
                    onPress={() =>
                      navigateToPage(i._id)
                    }
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ALL_TEXTS.SCREEN_NAME.EVENT, {
                  eventsData: events,
                })
              }
              style={styles.viewAllContainer}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Feather name="arrow-right" size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
