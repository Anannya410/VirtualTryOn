import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons'; 
import StyleStudio from './StyleStudio.js'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const ChooseBody = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/api/image_manager/list-images/")
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error.message);
      });
  }, []);

  const handleImagePress = (image) => {
    navigation.navigate("AvatarCreator", { imageName: image.image_name });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack(StyleStudio)}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {error ? (
        <Text style={styles.errorText}>{`Error: ${error}`}</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.image_name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
              <Image
                source={{ uri: `data:image/png;base64,${item.image_base64}` }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noImagesText}>No images available</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noImagesText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default ChooseBody;

