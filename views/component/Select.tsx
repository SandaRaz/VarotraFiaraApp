import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/solid';

export interface Option {
  value: any;
  label: string;
}

function Select({
  options,
  putSelectedValueTo,
  title,
  icon,
  iconColor,
  style,
}: {
  options: Option[] | null;
  putSelectedValueTo: (value: any) => void;
  title: string;
  icon?: React.JSX.Element;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
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

  const [selectedValue, setSelectedValue] = useState('');
  const [showSelect, toogleShowSelect] = useState(false);

  /* ------ Event Handler Callback ------ */
  const handleToogleShowSelect = () => {
    toogleShowSelect(!showSelect);
  };
  const handleSelectingValue = (option: Option) => {
    handleToogleShowSelect();
    setSelectedValue(option.label);
    putSelectedValueTo(option.value);
  };
  /* ------------------------------------ */

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={handleToogleShowSelect}
        style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {iconWithStyle != null ? iconWithStyle : null}
          </View>

          <View style={styles.valueTextContainer}>
            <Text style={styles.valueText}>{selectedValue}</Text>
          </View>

          <View style={styles.iconContainer}>
            {showSelect ? (
              <ChevronUpIcon color={'lightgrey'} size={'70%'} />
            ) : (
              <ChevronDownIcon color={'lightgrey'} size={'70%'} />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* ------ En dessous la liste qui s'ouvrira lorsque showSelect est true ----- */}

      {showSelect ? (
        <View style={styles.optionContainer}>
          {options == null ? (
            <View style={styles.option}>
              <Text style={styles.optionText}>vide</Text>
            </View>
          ) : (
            options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => {
                  handleSelectingValue(option);
                }}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      ) : null}

      {/* --------------- Fin de la liste ---------------- */}
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
    top: 90,
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

export default Select;
