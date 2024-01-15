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
  EnvelopeIcon, GlobeAltIcon,
  LockClosedIcon
} from "react-native-heroicons/solid";
import Input from '../../component/Input.tsx';
import Bouton from '../../component/Bouton.tsx';
import {useNavigation} from '@react-navigation/native';

function Config(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- GET VALUE STATES ---------------------

  const [getBaseUrl, setBaseUrl] = useState('');
  const handleSetBaseUrl = (value: string) => {
    setBaseUrl(value);
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
        <Text style={GlobalStyles.titleBarLabel}>Configuration</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <Input
            title={'Base url du site (ex: http://localhost:8080)'}
            placeholder={'www.example.com'}
            icon={<GlobeAltIcon />}
            iconColor={iconColor}
            putValueTo={handleSetBaseUrl}
          />

          <View style={[styles.buttonContainer]}>
            <Bouton
              label={'Enregistrer'}
              labelStyle={styles.buttonLabel}
              style={[
                styles.button,
                {
                  backgroundColor: validButtonColor,
                },
              ]}
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

export default Config;
