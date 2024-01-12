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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from '../../assets/GlobalStyles.tsx';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import Bouton from '../../component/Bouton.tsx';
import Picker from 'react-native-picker-select';
import {Option} from '../../component/Select.tsx';
import {parseDateHour} from '../../component/DatePicker.tsx';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

function NouvelleAnnonce(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- VALUES FROM DATABASE --------------------
  const categories: Option[] = [
    {value: 'CAT0001', label: 'SUV'},
    {value: 'CAT0002', label: 'Sedan'},
  ];
  const marques: Option[] = [
    {value: 'MRQ0001', label: 'Audi'},
    {value: 'MRQ0002', label: 'BMW'},
  ];
  const typeMoteurs: Option[] = [
    {value: 'TPM0001', label: 'Essence'},
    {value: 'TPM0002', label: 'Diesel'},
  ];
  const pays: Option[] = [
    {value: 'PAY0001', label: 'Coree'},
    {value: 'PAY0002', label: 'France'},
    {value: 'PAY0003', label: 'Japon'},
    {value: 'PAY0004', label: 'Madagascar'},
  ];
  const statut: number = 0;
  const date: string = parseDateHour(new Date());

  let annees: Option[] = [];
  for (let i = 1990; i < new Date().getFullYear(); i++) {
    annees.push({value: i, label: i.toString()});
  }

  // -------------------- GET VALUE STATES ---------------------
  const [getIdCategorie, setIdCategorie] = useState('');
  const [getIdMarque, setIdMarque] = useState('');
  const [getModele, setModele] = useState('');
  const [getIdTypeMoteur, setIdTypeMoteur] = useState('');
  const [getConsommation, setConsommation] = useState('');
  const [getNombrePlace, setNombrePlace] = useState('');
  const [getNombrePorte, setNombrePorte] = useState('');
  const [getAnnee, setAnnee] = useState('');
  const [getKilometrage, setKilometrage] = useState('');
  const [getIdProvenance, setIdProvenance] = useState('');
  const [getPrix, setPrix] = useState('');
  const [getStatut, setStatut] = useState('');
  const [getDateAnnonce, setDateAnnonce] = useState('');
  const [getImages, setImages] = useState([]);
  // -----------------------------------------------------------

  const renderIcon = () => <EnvelopeIcon />;

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
        <Text style={GlobalStyles.titleBarLabel}>Nouvelle Annonce</Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '20%'}} />

        <View style={styles.container}>
          <Picker
            Icon={() => {
              return (
                <FAIcon name="keyboard-arrow-down" size={24} color="gray" />
              );
            }}
            placeholder={{label: 'Categorie de vehicule', value: null}}
            onValueChange={value => setIdCategorie(value)}
            items={categories}
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

export default NouvelleAnnonce;
