import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Button, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { resizeImage, saveAvatar } from '../api/body_resize_api.js';
import Icon from 'react-native-vector-icons/Ionicons';
import StyleStudio from './StyleStudio.js';

const AvatarCreator = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageName } = route.params;

  const [currentImageData, setCurrentImageData] = useState(null);
  const [newImageData, setNewImageData] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [scaleLeg, setScaleLeg] = useState(1.0);
  const [scaleHand, setScaleHand] = useState(1.0);
  const [scaleNeck, setScaleNeck] = useState(1.0);
  const [scaleShoulder, setScaleShoulder] = useState(1.0);

  const fetchImage = useCallback(async () => {
    try {
      const image = await resizeImage({
        imageName: imageName,
        scale_leg: scaleLeg,
        scale_hand: scaleHand,
        scale_neck: scaleNeck,
        scale_shoulder: scaleShoulder,
      });
      setNewImageData(image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }, [scaleLeg, scaleHand, scaleNeck, scaleShoulder, imageName]);

  const handleSaveAvatar = async () => {
    try {
      await saveAvatar({
        image_name: 'xyz.png',
        image_data: newImageData,
      });
      Alert.alert('Success', 'Avatar saved successfully!');
      navigation.navigate('StyleStudio');
    } catch (error) {
      console.error('Error saving avatar:', error);
      Alert.alert('Error', 'Failed to save avatar.');
    }
  };

  useEffect(() => {
    if (newImageData) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageData(newImageData);
        fadeAnim.setValue(0); 
      });
    }
  }, [newImageData, fadeAnim]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack(StyleStudio)}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {currentImageData && (
          <Animated.Image
            source={{ uri: `data:image/png;base64,${currentImageData}` }}
            style={styles.image}
            resizeMode="stretch"
          />
        )}
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderRow}>
          <View style={styles.sliderItem}>
            <Text style={styles.sliderLabel}>Leg Scale</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              value={scaleLeg}
              onSlidingComplete={(value) => setScaleLeg(value)}
            />
          </View>
          <View style={styles.sliderItem}>
            <Text style={styles.sliderLabel}>Torso</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              value={scaleHand}
              onSlidingComplete={(value) => setScaleHand(value)}
            />
          </View>
        </View>
        <View style={styles.sliderRow}>
          <View style={styles.sliderItem}>
            <Text style={styles.sliderLabel}>Head</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              value={scaleNeck}
              onSlidingComplete={(value) => setScaleNeck(value)}
            />
          </View>
          <View style={styles.sliderItem}>
            <Text style={styles.sliderLabel}>Upper Torso</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              value={scaleShoulder}
              onSlidingComplete={(value) => setScaleShoulder(value)}
            />
          </View>
        </View>
      </View>
      <Button title="Save Avatar" onPress={handleSaveAvatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, 
    height: 700, 
    position: 'absolute', 
  },
  sliderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  sliderItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    marginTop: 10,
  },
  sliderLabel: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AvatarCreator;
