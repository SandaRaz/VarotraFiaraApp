import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../../assets/GlobalStyles.tsx';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Notification from './Notification.tsx';
import {
  BoiteNotificationData,
  NotificationData,
} from '../../../models/class/Types.ts';

function BoiteNotification(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const utilisateur = {
    id: 'USR0001',
    nom: 'Razanajatovo',
    prenoms: 'Sanda',
    dateNaissance: '',
    genre: 'masculin',
    nationalite: {
      id: 'NAT0001',
      nom: 'Madagascar',
    },
  };

  const notif1: NotificationData = {
    id: 'NOT0001',
    dateNotification: '2024-01-10 20:57',
    contenu: 'Sanda Razanajatovo vous a envoyé un message.',
  };
  const notif2: NotificationData = {
    id: 'NOT0002',
    dateNotification: '2024-01-10 21:08',
    contenu: 'John Doe vous a envoyé un message.',
  };
  const notif3: NotificationData = {
    id: 'NOT0003',
    dateNotification: '2024-01-10 22:53',
    contenu: 'Speed vous a envoyé un message.',
  };

  const boiteMessage: BoiteNotificationData = {
    id: 'BNT0001',
    proprietaire: utilisateur,
    notifications: [
      notif1,
      notif2,
      notif3,
      notif3,
      notif3,
      notif3,
      notif3,
      notif3,
      notif3,
      notif3,
    ],
  };

  return (
    <SafeAreaView>
      <StatusBar />

      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={GlobalStyles.backgroundImage}
        blurRadius={50}
      />

      <View style={GlobalStyles.titleBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NavbarStack', {screen: 'Annonces'});
          }}
          style={GlobalStyles.titleBarIcon}>
          <ArrowLeftIcon color={'#6C40C3'} size={'60%'} />
        </TouchableOpacity>
        <Text style={GlobalStyles.titleBarLabel}>Notifications</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '18%'}} />

        <View style={styles.container}>
          {boiteMessage.notifications.map((notification, index) => (
            <Notification
              key={index}
              data={notification}
              zIndex={boiteMessage.notifications.length - index}
            />
          ))}
        </View>

        <View style={{marginBottom: '5%'}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollable: {
    // backgroundColor: 'blue',
    minHeight: '100%',

    marginTop: '0%',
    marginBottom: '0%',
  },

  container: {
    width: '90%',
    minHeight: 500,
    height: 'auto',

    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.3)',

    alignSelf: 'center',
    marginBottom: '20%',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingTop: '2%',
  },
});

export default BoiteNotification;
