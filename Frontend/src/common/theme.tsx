import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;

const fontSize = {
  iconSize: 70,
  title: 32,
  h1: 30,
  h2: 28,
  h3: 26,
  h4: 25,
  h5: 24,
  h6: 22,
  xxlarge: 20,
  xlarge: 19,
  large: 18,
  medium: 17,
  average: 18.5,
  normal: 16,
  normalHalf: 15.5,
  small: 15,
  xsmall: 14,
  xxsmall: 13,
  tiny: 12,
  xtiny: 11,
  xxtiny: 10,
  xxxtiny: 9,
  xxxtinyH: 9.5,
  big: 20,
  sbig: 23,
  xbig: 27,
  xxbig: 29
};
const fontFamily = {
  tommy: "tommy",
  tommyMedium: "tommyMedium",
  tommyBold: "tommyBold",
  tommyLight: "tommyLight",
};
const window = {
  width,
  height
};
// updated colors being used in all ober the project
const colors = {
  red: "#F2180E",
  red2: "#F51515",
  red3: "#AE1215",
  orange: "#F1B44A",
  insta: "#E1306C",
  white: '#ffffff',
  blue1: '#264C86',
  blue2: "#1DA1F2",
  blue3: '#E9EDF3',
  blue4: '#5740E3',
  blue5: "#4F7FE3",
  blue6: "#6D9CE4",
  primary: '#264C86',
  gray1: "#C4C4C4",
  gray2: "#696969",
  gray3: "#7C7C7C",
  gray4: "#F3F5F5",
  gray5: "#F4F4F4",
  black: "#000000",
  green: "#25D366",
  yellow: "#FFE146",
  yellow2: "#f1c40f",
  black2: "#2D2D2D",
};

const shadow = {
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.19,
  shadowRadius: 5.62,
  elevation: 6
};

export { fontSize, fontFamily, window, colors, shadow, widthScreen, heightScreen };
