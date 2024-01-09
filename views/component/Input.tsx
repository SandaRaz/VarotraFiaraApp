import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';

function Input({
  putValueTo,
  title,
  icon,
  iconColor,
  placeholder,
  style,
  textStyle,
  isPassword,
  valueToConfirm,
}: {
  putValueTo?: (text: string) => void;
  title?: string;
  icon?: React.JSX.Element;
  iconColor?: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isPassword?: boolean;
  valueToConfirm?: string;
}): React.JSX.Element {
  // const iconColor: string = 'white';
  // const defaultIconColor: string = 'rgba(21,116,59, 1)';
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

  let iconPasswordPresent = false;
  if (isPassword != null) {
    if (isPassword) {
      iconPasswordPresent = true;
    }
  }
  const [masquerMotDePasse, setMasquerMotDePasse] =
    useState(iconPasswordPresent);
  const handleToggleMotDePasse = () => {
    setMasquerMotDePasse(!masquerMotDePasse);
  };

  const [passwordTextColor, setPasswordTextColor] = useState(
    'rgba(250,250,250,0.9)',
  );

  const [text, setText] = useState('');

  const handleInput = (text: string) => {
    setText(text);

    if (putValueTo !== undefined) {
      putValueTo(text);
    }

    if (valueToConfirm !== undefined) {
      if (valueToConfirm.length === 0) {
        setPasswordTextColor('rgba(250,250,250,0.9)');
      } else {
        if (valueToConfirm !== text) {
          setPasswordTextColor('red');
        } else {
          setPasswordTextColor('#1db954');
        }
      }
    }
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.container, style]}>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            {iconWithStyle != null ? iconWithStyle : null}
          </View>
          <TextInput
            style={[styles.inputText, textStyle, {color: passwordTextColor}]}
            placeholder={placeholder}
            placeholderTextColor={'rgba(250,250,250,0.5)'}
            secureTextEntry={masquerMotDePasse}
            value={text}
            onChangeText={handleInput}
          />

          {/*-------------- Gestion mot de passe ---------------*/}
          {iconPasswordPresent ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleToggleMotDePasse}>
              {masquerMotDePasse ? (
                <EyeIcon color={'lightgrey'} size={'70%'} />
              ) : (
                <EyeSlashIcon color={'lightgrey'} size={'70%'} />
              )}
            </TouchableOpacity>
          ) : null}
          {/*---------------------------------------------------*/}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 60,
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

  inputContainer: {
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

  inputText: {
    flex: 1,
    height: 'auto',
    // backgroundColor: 'red',
    color: 'white',
    textDecorationLine: 'none',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Input;
