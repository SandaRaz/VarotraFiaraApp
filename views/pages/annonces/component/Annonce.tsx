import {
  Dimensions,
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {AnnonceData} from '../../../../models/class/AnnonceType.ts';

function Annonce({
  annonceData,
  style,
}: {
  annonceData: AnnonceData;
  style: StyleProp<ViewStyle>;
}): React.JSX.Element {
  let statut = null;
  if (annonceData.statut == 3) {
    statut = <Text style={styles.statut}>dispo</Text>;
  } else if (annonceData.statut == 6) {
    statut = <Text style={styles.statut}>vendu</Text>;
  }

  const screenWidth = Dimensions.get('window').width;
  const marginBetweenImages = 0.03 * screenWidth;
  const images = [
    require('../../../assets/images/q7front.jpeg'),
    require('../../../assets/images/q7back.jpeg'),
    require('../../../assets/images/q7interior.jpeg'),
  ];

  return (
    <View style={style}>
      <View>
        <View style={styles.header}>
          <Text style={styles.nomProprietaire}>
            {annonceData.proprietaire.prenoms} {annonceData.proprietaire.nom}
          </Text>
          <TouchableOpacity>{statut}</TouchableOpacity>
        </View>
        <Text style={styles.dateAnnonce}>{annonceData.dataAnnonce}</Text>
        <View style={styles.descriptionRow}>
          <View style={styles.descriptions}>
            <Text style={styles.descriText}>
              Catégorie: {annonceData.categorie.nom}
            </Text>
            <Text style={styles.descriText}>
              Marque: {annonceData.marque.nom}
            </Text>
            <Text style={styles.descriText}>Modèle: {annonceData.modele}</Text>
            <Text style={styles.descriText}>Année: {annonceData.annee}</Text>
            {annonceData.provenance != null ? (
              <Text style={styles.descriText}>
                Provenance: {annonceData.provenance.nom}
              </Text>
            ) : null}
          </View>
          <View style={styles.descriptions}>
            <Text style={styles.descriText}>
              Nombre de place: {annonceData.nombrePlace}
            </Text>
            <Text style={styles.descriText}>
              Nombre de porte: {annonceData.nombrePorte}
            </Text>
            <Text style={styles.descriText}>
              Carburant: {annonceData.moteurType.type}
            </Text>
            <Text style={styles.descriText}>
              Consommation: {annonceData.consommation} Litre au 100
            </Text>
            <Text style={styles.descriText}>
              Kilométrage: {annonceData.kilometrage} Km
            </Text>
          </View>
        </View>
        <Text style={styles.prix}>
          Prix: {annonceData.prix.toLocaleString('fr-FR')} Ar
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scroller}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              {
                marginRight:
                  index < images.length - 1 ? marginBetweenImages : 0,
              },
              styles.imageContainer,
            ]}>
            <Image source={image} style={styles.annonceImages} />
          </View>
        ))}
        <View style={styles.imageContainer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',

    marginTop: '1%',
    marginBottom: '1%',
  },

  statut: {
    borderWidth: 2,
    borderColor: '#9937AE',
    borderRadius: 20,

    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',

    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '0%',
  },

  nomProprietaire: {
    width: 'auto',
    alignSelf: 'center',

    color: '#6C40C3',
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    flex: 1,
  },
  dateAnnonce: {
    width: '100%',
    alignSelf: 'center',

    color: 'grey',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },

  descriptionRow: {
    width: '100%',

    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'flex-start',
    justifyContent: 'space-between',

    marginTop: '2%',
    marginBottom: '2%',
  },
  descriptions: {
    // backgroundColor: 'white',
    width: '50%',
  },
  descriText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },

  prix: {
    width: '100%',
    alignSelf: 'center',

    color: '#9937AE',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },

  scroller: {
    width: '100%',
    borderRadius: 10,

    alignSelf: 'center',

    marginTop: '2%',
    marginBottom: '2%',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  annonceImages: {
    resizeMode: 'cover',

    width: 250,
    height: 200,

    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default Annonce;
