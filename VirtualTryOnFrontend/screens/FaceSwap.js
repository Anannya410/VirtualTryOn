import React, { useState, useEffect } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLatestAvatar } from '../api/body_resize_api.js'; 
import StyleStudio from './StyleStudio.js';

const FaceSwap = ({navigation}) => {
  const [bodyImageUri, setBodyImageUri] = useState(null);
  const [latestAvatar, setLatestAvatar] = useState(null);
  const [resultImageBase64, setResultImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestAvatar = async () => {
      try {
        const { avatar } = await getLatestAvatar();
        setLatestAvatar(avatar);
      } catch (error) {
        Alert.alert('Error fetching latest avatar', error.message);
      }
    };

    fetchLatestAvatar();
  }, []);

  const pickImage = async (setImageUri) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSwap = async () => {
    if (!bodyImageUri || !latestAvatar) {
      Alert.alert('Please select a body image and ensure the latest avatar is fetched');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('body_image', {
        uri: bodyImageUri,
        name: 'image1.jpg',
        type: 'image/jpeg',
      });
      formData.append('face_image', {
        uri: `data:image/jpeg;base64,${latestAvatar}`,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post('http://10.0.2.2:8000/api/face_swap/swap/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResultImageBase64(response.data.result_image_base64);
    } catch (error) {
      Alert.alert('Error swapping faces', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack(StyleStudio)}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Pick Face Image" onPress={() => pickImage(setBodyImageUri)} />
        <Button title="Swap Faces" onPress={handleSwap} />
      </View>
      
      <View style={styles.imageContainer}>
        {bodyImageUri && <Image source={{ uri: bodyImageUri }} style={styles.bodyImage} />}
        {latestAvatar && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${latestAvatar}` }}
            style={styles.avatarImage}
          />
        )}
      </View>
      
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      
      {resultImageBase64 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${resultImageBase64}` }}
          style={styles.resultImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  bodyImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  avatarImage: {
    width: 150,
    height: 500,
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  resultImage: {
    width: 200,
    height: 200,
  },
});

export default FaceSwap;
