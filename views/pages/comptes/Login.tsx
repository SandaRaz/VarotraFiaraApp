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
import React, {useState} from 'react';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import Bouton from '../../component/Bouton.tsx';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../models/class/services/CompteService.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UtilisateurData } from "../../../models/class/Types.ts";

function Login(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- GET VALUE STATES ---------------------

  const [getMail, setMail] = useState('');
  const handleSetNom = (value: string) => {
    setMail(value);
  };

  const [getMdp, setMdp] = useState('');
  const handleSetMdp = (value: string) => {
    setMdp(value);
  };

  const handleLogin = async () => {
    console.log('handling Login');
    try {
      const token = await loginUser(getMail, getMdp);
      console.log('Voici votre Token: ' + token);

      if (token) {
        await AsyncStorage.setItem('token', token);

        // const user: UtilisateurData = await
      }

      navigation.navigate('NavbarStack', {screen: 'Nouvelle'});
    } catch (error: any) {
      if (error.message.toLowerCase().includes('network')) {
        console.log('Network Error: ' + error);
        navigation.navigate('NavbarStack', {screen: 'Configuration'});
      }
      console.error('Erreur de connexion: ', error.message);
    }
  };

  // -----------------------------------------------------------

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
        <Text style={GlobalStyles.titleBarLabel}>Connexion</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <Input
            title={'Adresse mail'}
            placeholder={'email'}
            icon={<EnvelopeIcon />}
            iconColor={iconColor}
            putValueTo={handleSetNom}
            keyboardType={'email-address'}
          />
          <Input
            title={'Nouveau mot de passe'}
            placeholder={'mot de passe'}
            icon={<LockClosedIcon />}
            iconColor={iconColor}
            isPassword={true}
            putValueTo={handleSetMdp}
          />

          <View style={[styles.buttonContainer]}>
            <Bouton
              label={"Pas de Compte ? S'inscrire"}
              labelStyle={styles.buttonSBLabel}
              style={[styles.buttonSB]}
              onPress={() => {
                navigation.navigate('CompteStack', {screen: 'Inscription'});
              }}
            />
            <Bouton
              label={'Se connecter'}
              labelStyle={styles.buttonLabel}
              style={[
                styles.button,
                {
                  backgroundColor: validButtonColor,
                },
              ]}
              onPress={handleLogin}
            />
          </View>
        </View>
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
    width: '95%',
    height: '100%',

    flex: 1,
    // backgroundColor: 'red',

    alignSelf: 'center',
    marginBottom: '20%',
  },

  buttonContainer: {
    // backgroundColor: 'white',
    width: '90%',
    height: 45,
    marginTop: '9%',
    marginBottom: '5%',

    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    width: '35%',
    height: '100%',

    marginLeft: '5%',
  },

  buttonLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },

  buttonSB: {
    width: '45%',
    height: '100%',

    marginLeft: '5%',
    backgroundColor: 'rgba(250,250,250,0)',
  },

  buttonSBLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },
});

export default Login;
