import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

function MyIcon({
  component,
  title,
  titleColor,
  iconColor,
  iconSize,
  onPress,
}: {
  component: React.JSX.Element;
  title?: string;
  titleColor?: string;
  iconColor?: string;
  iconSize?: string | number;
  onPress?: (event: GestureResponderEvent) => void;
}): React.JSX.Element {
  const defaultIconColor: string = 'rgba(120,120,120, 0.9)';
  const defaultTitleColor: string = 'grey';
  if (iconColor == null) {
    iconColor = defaultIconColor;
  }
  if (titleColor == null) {
    titleColor = defaultTitleColor;
  }

  const componentWithStyle = React.cloneElement(component, {
    style: {color: iconColor, marginTop: '7%'},
    size: iconSize,
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {componentWithStyle}
      {title != null ? (
        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: 'auto',

    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '3%',
    marginBottom: '2%',

    borderRadius: 10,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 0,
    borderColor: 'rgba(125,125,125,1)',
  },

  title: {
    color: 'grey',
    fontFamily: 'Poppins-Light',
  },
});

export default MyIcon;
