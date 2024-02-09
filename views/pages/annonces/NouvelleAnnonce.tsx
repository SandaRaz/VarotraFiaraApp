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
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import {getAllMarques} from '../../../models/class/services/MarqueService.ts';
import {getAllPays} from '../../../models/class/services/PaysService.ts';
import {useLoginToken} from '../../../models/class/db/Token.ts';
import Wait from '../loading/Wait.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllCategories} from '../../../models/class/services/CategorieService.ts';
import {getAllTypeMoteurs} from '../../../models/class/services/TypeMoteur.ts';
import {
  ImageData,
  PaysData,
  PostAnnonceData,
} from '../../../models/class/Types.ts';
import {publierAnnonce} from '../../../models/class/services/AnnonceService.ts';

function NouvelleAnnonce(): React.JSX.Element {
  console.log('Opening NouvelleAnnonce');

  const navigation = useNavigation<any>();

  const isFocused = useIsFocused();
  const checkToken = useLoginToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserToken = async () => {
      await checkToken();
      setLoading(false);
    };

    if (isFocused) {
      checkUserToken();
    }
  }, [isFocused, checkToken]);

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
    const retrievingData = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        getAllCategories(token).then(value => {
          if (value !== undefined) {
            value.map(categorie =>
              categories.push({value: categorie.id, label: categorie.nom}),
            );
          }
        });
        getAllMarques(token).then(value => {
          if (value !== undefined) {
            value.map(marque =>
              marques.push({value: marque.id, label: marque.nom}),
            );
          }
        });
        getAllTypeMoteurs(token).then(value => {
          if (value !== undefined) {
            value.map(carburant =>
              typeMoteurs.push({value: carburant.id, label: carburant.type}),
            );
          }
        });
        getAllPays(token).then(value => {
          if (value !== undefined) {
            value.map(p => pays.push({value: p.id, label: p.nom}));
          }
        });
      }
    };
    retrievingData();
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
  const images: ImageData[] = [];
  getImages.map(asset => {
    if (asset.fileName && asset.id) {
      images.push({nomImage: asset.fileName + asset.id, base64: asset.base64});
    }
  });

  console.log('Images: ' + images);

  const newAnnonce: PostAnnonceData = {
    id: '',
    proprietaireId: '',
    categorieId: getIdCategorie,
    marqueId: getIdMarque,
    modele: getModele,
    typeMoteurId: getIdTypeMoteur,
    consommation: getConsommation,
    nombrePlace: getNombrePlace,
    nombrePorte: getNombrePorte,
    annee: getAnnee,
    kilometrage: getKilometrage,
    provenanceId: getIdProvenance,
    prix: getPrix,
    statut: getStatut,
    dataAnnonce: getDateAnnonce,
    images: images,
  };

  const handleNewAnnonce = async () => {
    try {
      console.log('Publier maintenant une annonce');

      const token = await AsyncStorage.getItem('token');
      if (token) {
        await publierAnnonce(token, newAnnonce);
      }
    } catch (error: any) {
      console.error('Erreur de connexion: ', error.message);
    }
  };

  const renderIcon = () => <EnvelopeIcon />;

  if (isFocused) {
    if (loading) {
      return <Wait />;
    }
  }

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
              options={typeMoteurs}
              title={'Type de carburant'}
              placeholder={' . . . '}
              icon={<FireIcon />}
              iconColor={iconColor}
              putSelectedValueTo={value => {
                setIdTypeMoteur(value);
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
              onPress={handleNewAnnonce}
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
