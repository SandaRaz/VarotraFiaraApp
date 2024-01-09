import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type DynamicCheckBoxData = {
  id: string | number;
  label: string;
};

type CheckBoxCallback = (selectedIds: string[]) => void;

function CheckBoxList({
  title,
  data,
  onCheckBoxChange,
  style,
  textStyle,
}: {
  title?: string;
  data: DynamicCheckBoxData[];
  onCheckBoxChange: CheckBoxCallback;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}): React.JSX.Element {
  const [checkboxes, setCheckboxes] = useState<{[key: string]: boolean}>(
    Object.fromEntries(data.map(item => [item.id, false])),
  );

  const handleCheckBoxChange = (checkboxId: string | number) => {
    /* --------- Async ---------
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));

    const selectedIds = Object.entries({...checkboxes})
      .filter(([key, value]) => value)
      .map(([key]) => key);

    onCheckBoxChange(selectedIds);
    */ /* -------- Sync -------- */
    setCheckboxes(prevCheckboxes => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [checkboxId]: !prevCheckboxes[checkboxId],
      };

      const selectedIds = Object.entries(updatedCheckboxes)
        .filter(([key, value]) => value)
        .map(([key]) => key);

      onCheckBoxChange(selectedIds);
      return updatedCheckboxes;
    });
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.checkList}>
        {data.map(item => (
          <CheckBox
            key={item.id}
            title={item.label}
            checked={checkboxes[item.id]}
            onPress={() => handleCheckBoxChange(item.id)}
            iconType={'material-community'}
            checkedIcon={'checkbox-outline'}
            uncheckedIcon={'checkbox-blank-outline'}
            containerStyle={[styles.container, style]}
            wrapperStyle={styles.wrapper}
            textStyle={[styles.valueText, textStyle]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  checkList: {
    width: '90%',
    // backgroundColor: 'red',

    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: '1%',
    marginBottom: '3%',
  },

  container: {
    width: '48%',
    height: 60,
    backgroundColor: 'rgba(250,250,250,0.2)',

    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0%',
    marginTop: '1%',
    marginBottom: '3%',
    marginLeft: '0%',
    marginRight: '0%',
  },

  wrapper: {
    width: '90%',
    // backgroundColor: 'red',

    alignSelf: 'center',
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
});

export type {DynamicCheckBoxData};
export default CheckBoxList;
