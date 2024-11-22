// Events.js
import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components";
import { ALL_TEXTS } from "../../common";
import { StackNavigation } from "../../constant/navigationType";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Events = () => {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute();
  const { eventsData } = route.params;

  const navigateToPage = async (id) => {
    let city = await AsyncStorage.getItem("city");
    let area = await AsyncStorage.getItem("area");
    if (city && area) {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.VENUES, { eventId: id })
    } else {
      navigation.navigate(ALL_TEXTS.SCREEN_NAME.LOCATION, { eventId: id })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon onBackPress={() => navigation.goBack()} text={ALL_TEXTS.HEADINGS.events}></Header>
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {eventsData.map((card) => (
          <View style={styles.cardMainContainer} key={card._id} >
            <TouchableOpacity style={styles.cardContainer} onPress={() => navigateToPage(card._id)}  >
              <Image
                source={{ uri: card.image }}
                style={styles.image}
              // resizeMode="repeat"
              />
            </TouchableOpacity>
            <Text style={styles.text}>{card.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;
