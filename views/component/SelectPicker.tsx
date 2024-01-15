import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/solid';
import Picker, {PickerStyle} from 'react-native-picker-select';

export interface Option {
  value: any;
  label: string;
}

function SelectPicker({
  options,
  putSelectedValueTo,
  title,
  placeholder,
  icon,
  iconColor,
  style,
  containerStyle,
}: {
  options: Option[];
  putSelectedValueTo: (value: any) => void;
  title: string;
  placeholder?: string;
  icon?: React.JSX.Element;
  iconColor?: string;
  style?: PickerStyle;
  containerStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
}): React.JSX.Element {
  const defaultIconColor: string = '#1db954';
  if (iconColor == null) {
    iconColor = defaultIconColor;
  }
  const iconSize: string | number = '100%';

  let iconWithStyle = null;
  if (icon != null) {
    iconWithStyle = React.cloneElement(icon, {
      style: {color: iconColor},
      size: iconSize,
    });
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        style={style}
        onValueChange={putSelectedValueTo}
        items={options}
        placeholder={{label: placeholder, value: ''}}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(250,250,250,0.2)',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0%',
    marginTop: '1%',
    marginBottom: '3%',
  },

  title: {
    width: '90%',
    // backgroundColor: 'red',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: '3%',
    marginBottom: '0%',

    color: 'white',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    width: '8%',
    aspectRatio: 1,
    // backgroundColor: 'blue',

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: '3%',
    marginRight: '3%',
  },

  valueTextContainer: {
    flex: 1,
    height: 'auto',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  valueText: {
    flex: 1,
    height: 'auto',
    // backgroundColor: 'red',
    color: 'rgba(250,250,250,0.5)',
    textDecorationLine: 'none',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },

  bar: {
    width: '100%',
    height: '5%',

    backgroundColor: 'white',
  },

  optionContainer: {
    position: 'absolute',
    top: '90%',
    zIndex: 1,
    width: '90%',
    backgroundColor: 'white',

    alignSelf: 'center',
    elevation: 10,
  },

  option: {
    minHeight: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    paddingLeft: '5%',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  optionText: {
    color: 'rgb(30,30,30)',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});

export default SelectPicker;
