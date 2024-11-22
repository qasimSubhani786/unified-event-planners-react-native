import React, { useEffect, useRef, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { styles } from "./style";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components";
import { colors } from "../../common";
import { useSelector } from "react-redux";
import { useAddReviewsMutation } from "../../utils/redux/slice/emptySplitApi";

const AddReview = ({ id, onRevirewAdded, venueName }) => {
  const [addReviewAPI, addReiewResponse] = useAddReviewsMutation();
  const [rating, setRating] = useState(0); // State for rating
  const [reviewText, setReviewText] = useState(""); // State for review text
  const userInfo = useSelector((state: any) => state?.auth?.user);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };

  const handleAddReview = async () => {
    if (userInfo && userInfo.token != "") {
      const response = await addReviewAPI({
        body: {
          userName: userInfo?.name,
          rating: rating,
          details: reviewText,
        },
        id: id,
      });
      if (response && response.data.success) {
        onRevirewAdded()
        ToastAndroid.show("Review Added Succesfully", ToastAndroid.SHORT);
        setRating(0);
        setReviewText("");
        this.RBSheet.close();
      }
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{venueName}</Text>
      <Text style={styles.subHead}>{userInfo.name}</Text>
      <View style={styles.ratingContainer}>
        <AirbnbRating
          count={5}
          defaultRating={0}
          size={24}
          isDisabled={false}
          showRating={false}
          selectedColor={colors.yellow2}
          onFinishRating={handleRatingChange}
        />
      </View>

      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder="Review"
        placeholderTextColor={colors.gray1}
        value={reviewText}
        onChangeText={handleReviewTextChange}
      />

      <View style={styles.addBtn}>
        <Button text="Add" onPress={handleAddReview} loader={addReiewResponse.isLoading} />
      </View>
    </View>
  );
};

export default AddReview;
