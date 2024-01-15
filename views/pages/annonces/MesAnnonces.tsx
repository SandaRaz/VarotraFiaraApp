import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import GlobalStyles from '../../assets/GlobalStyles.tsx';
import Annonce from './component/Annonce.tsx';
import {
  AnnonceData,
  PaysData,
  UtilisateurData,
} from '../../../models/class/Types.ts';

function MesAnnonces(): React.JSX.Element {
  const paysProprietaire: PaysData = {
    id: '',
    nom: 'Madagascar',
  };
  const proprietaire: UtilisateurData = {
    id: '',
    nom: 'Razanajatovo',
    prenoms: 'Sanda',
    dateNaissance: '',
    genre: 'masculin',
    nationalite: paysProprietaire,
  };

  const annonce1: AnnonceData = {
    id: '',
    proprietaire: proprietaire,
    categorie: {
      id: '',
      nom: 'SUV',
    },
    marque: {
      id: '',
      nom: 'Audi',
    },
    modele: 'Q7',
    moteurType: {
      id: '',
      type: 'Diesel',
    },
    consommation: 10,
    nombrePlace: 5,
    nombrePorte: 5,
    annee: 2016,
    kilometrage: 75000,
    provenance: paysProprietaire,
    prix: 30000000,
    statut: 3,
    dataAnnonce: '2024-01-07',
    images: null,
  };

  return (
    <SafeAreaView>
      <StatusBar />

      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={GlobalStyles.backgroundImage}
        blurRadius={50}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollable}>
        <View style={{marginTop: '5%'}} />
        <Annonce style={styles.annonce} annonceData={annonce1} />
        <Annonce style={styles.annonce} annonceData={annonce1} />
        <Annonce style={styles.annonce} annonceData={annonce1} />
        <View style={{marginBottom: '15%'}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollable: {
    // backgroundColor: 'red',
    minHeight: '100%',

    marginTop: '0%',
    marginBottom: '0%',
  },

  annonce: {
    backgroundColor: 'rgba(100,100,100,0.3)',
    borderRadius: 10,

    width: '90%',
    height: 'auto',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingTop: '1%',
    paddingBottom: '1%',

    alignSelf: 'center',

    marginTop: '0%',
    marginBottom: '5%',
  },
});

export default MesAnnonces;
