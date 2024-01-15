import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import {NotificationData} from '../../../models/class/Types.ts';
import {XMarkIcon} from 'react-native-heroicons/solid';

const Menu = ({
  handleCloseOption,
}: {
  handleCloseOption: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsHeader}>
        <TouchableOpacity
          style={styles.optionsHeaderIcons}
          onPress={handleCloseOption}>
          <XMarkIcon size={25} color={'rgba(30,30,30,0.7)'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionLabel}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

function Notification({
  data,
  style,
  zIndex,
}: {
  data: NotificationData;
  style?: StyleProp<ViewStyle>;
  zIndex?: number;
}): React.JSX.Element {
  const [showOption, toogleShowOption] = useState(false);

  const handleToogleShowOption = () => {
    toogleShowOption(!showOption);
  };

  const handleCloseOption = () => {
    toogleShowOption(false);
  };

  return (
    <View style={[styles.notification, style, {zIndex: zIndex}]}>
      <Text style={styles.contenu}>{data.contenu}</Text>
      <Text style={styles.dateNotif}>{data.dateNotification}</Text>
      <TouchableOpacity
        style={styles.threePoint}
        onPress={handleToogleShowOption}>
        <FAIcon name={'ellipsis-h'} size={16} color={'rgb(30,30,30)'} />
      </TouchableOpacity>
      {showOption ? <Menu handleCloseOption={handleCloseOption} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  notification: {
    backgroundColor: 'rgba(250,250,250,0.7)',

    minHeight: 70,
    height: 'auto',

    borderRadius: 8,

    marginBottom: '3%',
    // paddingLeft: '2.5%',
    // paddingRight: '10%',
    paddingTop: '1.5%',
    paddingBottom: '2.5%',
  },

  contenu: {
    width: '85%',
    marginLeft: '2%',

    // backgroundColor: 'blue',
    color: 'rgb(30,30,30)',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    marginBottom: '5%',
  },
  nomComplet: {
    color: '#CD1F90',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  dateNotif: {
    // color: '#6C40C3',
    fontSize: 13,
    color: '#CD1F90',
    fontFamily: 'Poppins-LightItalic',

    position: 'absolute',
    left: '2.5%',
    bottom: '2.5%',
  },

  threePoint: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: '12%',
    right: '1%',

    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionsContainer: {
    position: 'absolute',
    top: '50%',
    right: '3.5%',
    // zIndex: 1,
    width: '40%',
    height: 'auto',
    backgroundColor: 'rgba(250,250,250,1)',

    elevation: 10,
  },
  optionsHeader: {
    height: 40,
    backgroundColor: 'rgba(250,250,250,1)',
    // backgroundColor: 'blue',
    width: '100%',

    flex: 1,
    justifyContent: 'center',
  },
  optionsHeaderIcons: {
    // backgroundColor: 'red',
    width: '15%',
    left: '4%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    height: 60,
    backgroundColor: 'rgba(250,250,250,1)',
    // backgroundColor: 'red',
    borderTopWidth: 2,
    borderColor: 'rgba(30,30,30,0.7)',

    paddingLeft: '5%',

    justifyContent: 'center',
  },
  optionLabel: {
    color: 'rgb(30,30,30)',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default Notification;
