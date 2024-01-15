import React from 'react';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/mini';

function ImageUploader({
  title,
  images,
  setImages,
  style,
  textStyle,
  containerStyle,
}: {
  title?: string;
  images: Asset[];
  setImages: React.Dispatch<React.SetStateAction<Asset[]>>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}): React.JSX.Element {
  const ajouterImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    //const [images, setImages] = useState<Asset[]>([]);

    launchImageLibrary(options, response => {
      console.log(response);
      if (!response.didCancel && response.assets) {
        setImages(prevImages => [...prevImages, ...(response.assets || [])]);
      }
    });
  };

  const supprimerImage = (index: number) => {
    setImages(prevImages => prevImages.filter((image, i) => i !== index));
  };

  const afficherImages = () => {
    return images.map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        <Image
          // source={{uri: image.uri}}
          source={{uri: `data:${image.type};base64,${image.base64}`}}
          style={[
            styles.image,
            {
              marginRight: index < images.length - 1 ? 15 : 0,
            },
          ]}
        />
        <TouchableOpacity
          style={styles.removeImage}
          onPress={() => {
            supprimerImage(index);
          }}>
          <XCircleIcon size={'100%'} color={'rgba(30,30,30,0.7)'} />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={ajouterImage}>
        <Text style={styles.touchableLabel}>click</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.imagesContainers}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {afficherImages()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(250,250,250,0.2)',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0%',
    marginTop: '1%',
    marginBottom: '3%',
  },

  title: {
    width: '90%',
    // backgroundColor: 'red',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: '3%',
    marginBottom: '0%',

    color: 'white',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },

  touchableLabel: {
    color: 'rgba(250,250,250,0.5)',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },

  imagesContainers: {
    width: '95%',
    height: 'auto',

    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderColor: 'rgba(250,250,250,0.2)',

    alignSelf: 'center',
    paddingVertical: '2%',
  },

  imageContainer: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 10,

    backgroundColor: 'rgba(250,250,250,0.5)',

    marginLeft: 15,
  },

  image: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },

  removeImage: {
    position: 'absolute',
    top: '2%',
    right: '2%',

    borderRadius: 50,
    backgroundColor: 'rgba(250,250,250,0.7)',
    width: '20%',
    aspectRatio: 1,
    zIndex: 1,
  },
});

export default ImageUploader;
