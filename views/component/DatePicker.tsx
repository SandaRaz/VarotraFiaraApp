import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CalendarDaysIcon} from 'react-native-heroicons/solid';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

function parseDate(date: Date): string {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
}

function DatePicker({
  title,
  putValueTo,
  icon,
  iconColor,
  style,
}: {
  title: string;
  putValueTo: (value: any) => void;
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

  const [showDate, toogleShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const handeToogleShowDate = () => {
    toogleShowDate(!showDate);
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    toogleShowDate(!showDate);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    putValueTo(currentDate);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={handeToogleShowDate}
        style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {iconWithStyle != null ? iconWithStyle : null}
          </View>

          <View style={styles.valueTextContainer}>
            <Text style={styles.valueText}>{parseDate(date)}</Text>
          </View>

          <View style={styles.iconContainer}>
            <CalendarDaysIcon color={'lightgrey'} size={'70%'} />
          </View>
        </View>
      </TouchableOpacity>
      {showDate ? <RNDateTimePicker value={date} onChange={onChange} /> : null}
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
    top: 108,
    zIndex: 1,
    width: '90%',
    backgroundColor: 'white',

    alignSelf: 'center',
    elevation: 20,
  },

  option: {
    minHeight: 60,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    paddingLeft: '5%',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});

export {parseDate};
export default DatePicker;
