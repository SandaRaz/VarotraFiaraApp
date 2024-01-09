import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import React from 'react';

function MenuButton({
  label,
  background,
  icon,
  iconColor,
  style,
  onPress,
}: {
  label: string;
  background?: string;
  icon?: React.JSX.Element;
  iconColor?: string;
  style?: StyleProp<ViewProps>;
  onPress?: (event: GestureResponderEvent) => void;
}): React.JSX.Element {
  const defaultBackgroundColor = 'rgba(250,250,250, 0.8)';
  if (background == null) {
    background = defaultBackgroundColor;
  }
  const defaultIconColor: string = 'rgba(120,120,120, 0.9)';
  if (iconColor == null) {
    iconColor = defaultIconColor;
  }
  const iconeSize: string = '100%';

  let iconWithStyle = null;
  if (icon != null) {
    iconWithStyle = React.cloneElement(icon, {
      style: [{color: iconColor}, styles.icon],
      size: iconeSize,
    });
  }

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: background}, style]}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      {iconWithStyle}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    minHeight: 60,
    height: 'auto',

    borderRadius: 10,

    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    marginTop: '3%',
    marginBottom: '3%',
  },

  label: {
    flex: 1,
    color: 'rgb(30,30,30)',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  icon: {
    // backgroundColor: 'red',

    maxWidth: '6%',
    alignSelf: 'flex-end',
  },
});

export default MenuButton;
