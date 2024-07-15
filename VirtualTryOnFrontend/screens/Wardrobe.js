import React from 'react';
import { View, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { postImage } from '../api/post_api';
import Footer from './Community/Footer.js'

const images = [
  
  require('../assets/wardrobe/littleGirl.jpeg'),
  require('../assets/wardrobe/workGirl.png'),
  require('../assets/wardrobe/dress1.jpeg'),
  require('../assets/wardrobe/dress2.jpeg'),
  require('../assets/wardrobe/dress3.jpeg'),
  require('../assets/wardrobe/dress4.jpeg'),
  require('../assets/wardrobe/dress5.jpg'),
  require('../assets/wardrobe/dress6.jpg'),
  require('../assets/wardrobe/dress7.jpg'),
  require('../assets/wardrobe/dress9.jpg'),
];

const Wardrobe = ({}) => {
  const handlePost = async (imageUri, imageName) => {
    const result = await postImage(imageUri, imageName);
    if (result.success) {
      Alert.alert(result.message);
    } else {
      Alert.alert('Failed to post image', result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
            <Button
              title="Post"
              onPress={() => handlePost(Image.resolveAssetSource(image).uri, `image_${index}.png`)}
            />
          </View>
        ))}
      </View>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 200,
    height: 500,
    marginBottom: 5,
  },
});

export default Wardrobe;
