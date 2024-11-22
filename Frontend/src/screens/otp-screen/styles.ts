import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.tommy,
    fontSize: 20,
    textTransform: 'capitalize',
  },
  detail: {
    color: colors.gray1,
    fontFamily: fontFamily.tommyLight,
    fontSize: 10,
  },
  textContainer: {
    marginTop: 20,
  },
  backIcon: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 4,
    height: 40,
    width: 40,
    fontSize: 14,
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  expectOtp: {
    color: colors.green,
    fontFamily: fontFamily.tommy,
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  black: {
    color: colors.black,
  },
});
