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
  HomeIcon,
  LockClosedIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import {
  PencilIcon,
  CalendarIcon,
  UserGroupIcon,
} from 'react-native-heroicons/solid';
import DatePicker from '../../component/DatePicker.tsx';
import Select, {Option} from '../../component/Select.tsx';
import Bouton from '../../component/Bouton.tsx';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function Inscription(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- GET VALUE STATES ---------------------

  const [getNom, setNom] = useState('');
  const handleSetNom = (value: string) => {
    setNom(value);
  };

  const [getPrenom, setPrenom] = useState('');
  const handleSetPrenom = (value: string) => {
    setPrenom(value);
  };

  const [getDateNaissance, setDateNaissance] = useState('');
  const handleSetDateNaissance = (value: string) => {
    setDateNaissance(value);
  };

  const [getGenre, setGenre] = useState('');
  const handleSetGenre = (value: string) => {
    setGenre(value);
  };
  const [getNationalite, setNationalite] = useState('');
  const handleSetNationalite = (value: string) => {
    setNationalite(value);
  };

  // -----------------------------------------------------------

  const genres: Option[] = [];
  genres.push({value: 'masculin', label: 'Masculin'});
  genres.push({value: 'feminin', label: 'Féminin'});

  const nationalites: Option[] = [];
  nationalites.push({value: 'NAT0001', label: 'Madagascar'});
  nationalites.push({value: 'NAT0002', label: 'France'});
  nationalites.push({value: 'NAT0003', label: 'US'});

  const lastSelectMarginBottom: number = 60 * nationalites.length + 20;

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
            navigation.navigate('NavbarStack', {screen: 'Compte'});
          }}
          style={GlobalStyles.titleBarIcon}>
          <ArrowLeftIcon color={'#6C40C3'} size={'60%'} />
        </TouchableOpacity>
        <Text style={GlobalStyles.titleBarLabel}>Inscription</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <Input
            title={'Nom'}
            placeholder={'Votre nom'}
            icon={<PencilIcon />}
            iconColor={iconColor}
            putValueTo={handleSetNom}
          />
          <Input
            title={'Prénoms'}
            placeholder={'Votre prénoms'}
            icon={<PencilIcon />}
            iconColor={iconColor}
            putValueTo={handleSetPrenom}
          />
          <DatePicker
            title={'Date de naissance'}
            putValueTo={handleSetDateNaissance}
            icon={<CalendarIcon />}
            iconColor={iconColor}
          />
          <Select
            options={genres}
            putSelectedValueTo={handleSetGenre}
            title={'Genre'}
            icon={<UserGroupIcon />}
            iconColor={iconColor}
          />
          <Select
            options={nationalites}
            putSelectedValueTo={handleSetNationalite}
            title={'Nationalité'}
            icon={<HomeIcon />}
            iconColor={iconColor}
          />
          <View
            style={[
              styles.buttonContainer,
              {marginBottom: lastSelectMarginBottom},
            ]}>
            <Bouton
              onPress={() => {
                navigation.navigate('CompteStack', {screen: 'Inscription2'});
              }}
              label={'Suivant'}
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
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
});

export default Inscription;
