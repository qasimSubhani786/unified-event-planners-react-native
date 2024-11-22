import { View, Dimensions } from 'react-native'
import React from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

export function BottomSheet({ reference, onClose, children }) {

  const screenHeight = Dimensions.get("screen").height
  return (
    <View>
      <RBSheet
        height={screenHeight - 200}
        ref={reference}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        onClose={onClose}
        keyboardAvoidingViewEnabled
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}
      >
        {children}
      </RBSheet>
    </View>
  )
}