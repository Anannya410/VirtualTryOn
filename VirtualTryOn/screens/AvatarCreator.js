import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { resizeImage } from '../api/body_resize_api.js';
import Icon from 'react-native-vector-icons/Ionicons'; 
import StyleStudio from './StyleStudio.js'

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

  useEffect(() => {
    if (newImageData) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Duration of the fade-in animation
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageData(newImageData);
        fadeAnim.setValue(0); // Reset fadeAnim to fully transparent for the next transition
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
            resizeMode="contain"
          />
        )}
        {newImageData && (
          <Animated.Image
            source={{ uri: `data:image/png;base64,${newImageData}` }}
            style={[styles.image, { opacity: fadeAnim }]}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Leg Scale</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          value={scaleLeg}
          onSlidingComplete={(value) => setScaleLeg(value)}
        />
        <Text style={styles.sliderLabel}>Torso</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          value={scaleHand}
          onSlidingComplete={(value) => setScaleHand(value)}
        />
        <Text style={styles.sliderLabel}>Upper Torso</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          value={scaleNeck}
          onSlidingComplete={(value) => setScaleNeck(value)}
        />
        <Text style={styles.sliderLabel}>Head</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          value={scaleShoulder}
          onSlidingComplete={(value) => setScaleShoulder(value)}
        />
      </View>
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
    width: '100%',
    height: '100%', // Adjust the height as needed to fit the entire image
    position: 'absolute', // Overlap the images
  },
  sliderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  slider: {
    width: 200,
    marginTop: 10,
  },
  sliderLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarCreator;


