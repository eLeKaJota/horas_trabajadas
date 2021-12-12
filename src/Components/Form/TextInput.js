import React, {forwardRef} from 'react';
import {TextInput as RNTextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// eslint-disable-next-line react/display-name
const TextInput = forwardRef(({icon, ...otherProps}, ref) => {
  const validationColor = '#223e4b';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 54,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: 1,
        padding: 8,
      }}>
      <View style={{padding: 8}}>
        <Ionicons name={icon} color={validationColor} size={16} />
      </View>
      <View style={{flex: 1}}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          ref={ref}
          {...otherProps}
        />
      </View>
    </View>
  );
});

export default TextInput;
