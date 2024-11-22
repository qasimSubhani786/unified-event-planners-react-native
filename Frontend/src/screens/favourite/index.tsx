import { SafeAreaView, View, Text, Image, ToastAndroid } from "react-native";
import { style } from "./style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Header, ScreenLoader } from "../../components";
import { AirbnbRating } from "react-native-ratings";
import { EmptyBox, Location } from "../../utils/svgs";
import { useEffect } from "react";
import { ALL_TEXTS, colors } from "../../common";
import { StackNavigation } from "../../constant/navigationType";
import { useNavigation } from "@react-navigation/native";
import {
  useLazyGetFavouriteHallsQuery,
  useMarkHallasFavoriteMutation,
} from "../../utils/redux/slice/emptySplitApi";
import { AntDesign } from "@expo/vector-icons";

const Favourite = () => {
  const [getFavourite, getFavouriteResponse] = useLazyGetFavouriteHallsQuery();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    getVenues();
  }, []);
  const [favoriteAPI, favoriteResponse] = useMarkHallasFavoriteMutation();

  const getVenues = async () => {
    await getFavourite();
  };

  const onFavoriteHallHandler = async (hall) => {
    const response: any = await favoriteAPI({
      hallId: hall._id,
      isFavorite: false,
    });
    if (response && response.data.success) {
      ToastAndroid.show(
        `${hall.title} mark as   Unfavorite`,
        ToastAndroid.SHORT
      );
      getFavourite();
    }
  };

  const venuesData = getFavouriteResponse?.data?.data || [];

  const isLongTitle = (title) => {
    return title.length > 15;
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        onBackPress={() => navigation.goBack()}
        backIcon
        text={ALL_TEXTS.HEADINGS.favourite}
      />
      <ScrollView>
        {getFavouriteResponse.isFetching ? (
          <View style={style.loader}>
            <ScreenLoader />
          </View>
        ) : venuesData.length == 0 ? (
          <View style={style.nofv8}>
            <EmptyBox />
            <Text style={style.noFav8Text}>Your Favourite List is Empty</Text>
            <Text style={style.subTxxt}>
              Explore Events and add them to favourite to show there
            </Text>
          </View>
        ) : (
          venuesData.map((venue) => (
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
                <View style={style.titleHeartContainer}>
                  <Text style={style.cardTitle}>{venue.title}</Text>
                  <TouchableOpacity
                    onPress={() => onFavoriteHallHandler(venue)}
                  >
                    <AntDesign
                      style={style.heart}
                      name="heart"
                      size={24}
                      color={colors.red2}
                    />
                  </TouchableOpacity>
                </View>
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
      </ScrollView>
      <View style={style.contBtn}>
        <Button text={"Explore Your Events"} onPress={() => navigation.navigate(ALL_TEXTS.SCREEN_NAME.HOME)}></Button>
      </View>
    </SafeAreaView>
  );
};

export default Favourite;
