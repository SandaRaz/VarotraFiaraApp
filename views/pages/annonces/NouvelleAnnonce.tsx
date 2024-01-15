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
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from '../../assets/GlobalStyles.tsx';
import {
  ArrowLeftIcon,
  CreditCardIcon,
  CubeIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  FireIcon,
  GlobeEuropeAfricaIcon,
  PencilIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import Input from '../../component/Input.tsx';
import Bouton from '../../component/Bouton.tsx';
import Select, {Option} from '../../component/Select.tsx';
import {parseDateHour} from '../../component/DatePicker.tsx';
import SelectPicker from '../../component/SelectPicker.tsx';
import ImageUploader from '../../component/ImageUploader.tsx';
import {Asset} from 'react-native-image-picker';
import RequestService from '../../../models/class/RequestService.ts';
import {MarqueData} from '../../../models/class/Types.ts';
import axios from 'axios';
import {
  getAllCategories,
  getAllMarques,
  getAllPays,
} from '../../../models/class/NetworkService.ts';

const requestService = new RequestService();

function NouvelleAnnonce(): React.JSX.Element {
  const navigation = useNavigation<any>();

  const iconColor = '#cd1f90';
  const validButtonColor = '#6C40C3';

  // -------------------- VALUES FROM DATABASE --------------------
  const categories: Option[] = [];
  const marques: Option[] = [];
  const typeMoteurs: Option[] = [];
  const pays: Option[] = [];
  const statut: number = 0;
  const date: string = parseDateHour(new Date());

  let annees: Option[] = [];
  for (let i = 1980; i <= new Date().getFullYear(); i++) {
    annees.push({value: i, label: i.toString()});
  }

  useEffect(() => {
    getAllMarques().then(value => {
      if (value !== undefined) {
        value.map(marque =>
          marques.push({value: marque.id, label: marque.nom}),
        );
      }
    });
    getAllPays().then(value => {
      if (value !== undefined) {
        value.map(p => pays.push({value: p.id, label: p.nom}));
      }
    });
  });

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
  const [getImages, setImages] = useState<Asset[]>([]);
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
          <View style={styles.row}>
            <Select
              options={categories}
              title={'Categorie de vehicule'}
              placeholder={' . . . '}
              icon={<CubeIcon />}
              iconColor={iconColor}
              putSelectedValueTo={value => {
                setIdCategorie(value);
              }}
              containerStyle={styles.form}
            />
            <Select
              options={marques}
              title={'Marque de vehicule'}
              placeholder={' . . . '}
              icon={<CreditCardIcon />}
              iconColor={iconColor}
              putSelectedValueTo={value => {
                setIdMarque(value);
              }}
              containerStyle={styles.form}
            />
          </View>
          <View style={styles.row}>
            <Input
              title={'Modele'}
              placeholder={' . . . '}
              icon={<TruckIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setModele(value);
              }}
              containerStyle={styles.form}
            />
            <Select
              options={categories}
              title={'Type de carburant'}
              placeholder={' . . . '}
              icon={<FireIcon />}
              iconColor={iconColor}
              putSelectedValueTo={value => {
                setIdMarque(value);
              }}
              containerStyle={styles.form}
            />
          </View>
          <View style={styles.row}>
            <Input
              title={'Consommation'}
              placeholder={' . . . '}
              icon={<PencilIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setConsommation(value);
              }}
              containerStyle={styles.form}
              keyboardType={'number-pad'}
            />
            <Input
              title={'Nombre de place'}
              placeholder={' . . . '}
              icon={<PencilIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setNombrePlace(value);
              }}
              containerStyle={styles.form}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={styles.row}>
            <Input
              title={'Nombre de porte'}
              placeholder={' . . . '}
              icon={<PencilIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setNombrePorte(value);
              }}
              containerStyle={styles.form}
              keyboardType={'number-pad'}
            />
            <SelectPicker
              options={annees}
              putSelectedValueTo={value => {
                setAnnee(value);
              }}
              title={'Annee'}
              placeholder={' . . . '}
              style={pickerSelectStyle}
              containerStyle={styles.form}
            />
          </View>
          <View style={styles.row}>
            <Input
              title={'Kilométrage'}
              placeholder={' . . . '}
              icon={<PencilIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setKilometrage(value);
              }}
              containerStyle={styles.form}
              keyboardType={'number-pad'}
            />
            <Select
              options={pays}
              title={'Provenance'}
              placeholder={' . . . '}
              icon={<GlobeEuropeAfricaIcon />}
              iconColor={iconColor}
              putSelectedValueTo={value => {
                setIdProvenance(value);
              }}
              containerStyle={styles.form}
            />
          </View>
          <View style={styles.row}>
            <Input
              title={'Prix (Ariary)'}
              placeholder={'000.00'}
              icon={<CurrencyDollarIcon />}
              iconColor={iconColor}
              putValueTo={value => {
                setPrix(value);
              }}
              containerStyle={styles.form}
              keyboardType={'number-pad'}
            />
          </View>
          <ImageUploader
            title={'Ajouter des images'}
            images={getImages}
            setImages={setImages}
          />

          <View style={[styles.buttonContainer]}>
            <Bouton
              label={'Publier'}
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

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  form: {
    width: '50%',
  },

  buttonContainer: {
    // backgroundColor: 'white',
    width: '90%',
    height: 45,
    marginTop: '20%',
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

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(250,250,250, 0.2)',
    borderRadius: 10,

    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
    marginTop: '1%',
    marginBottom: '2%',

    color: 'rgba(250,250,250,0.5)',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default NouvelleAnnonce;
