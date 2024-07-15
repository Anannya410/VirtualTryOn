import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getLatestAvatar } from '../api/body_resize_api.js';

const StyleStudio = () => {
  const navigation = useNavigation();
  const [icon_1] = useState(new Animated.Value(85));
  const [icon_2] = useState(new Animated.Value(85));
  const [icon_3] = useState(new Animated.Value(85));
  const [pop, setPop] = useState(false);
  const [latestAvatar, setLatestAvatar] = useState(null);

  const fetchLatestAvatar = async () => {
    try {
      const { avatar } = await getLatestAvatar();
      setLatestAvatar(avatar);
    } catch (error) {
      console.error('Error fetching latest avatar:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLatestAvatar();
    }, [])
  );

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 85,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 85,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 85,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 160,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 235,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 310,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {latestAvatar ? (
          <Image
            source={{ uri: `data:image/png;base64,${latestAvatar}` }}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        ) : (
          <Text>No avatar saved yet.</Text>
        )}
      </View>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Wardrobe")}>
          <IconMC name="wardrobe-outline" size={28} color="#ffff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("ChooseBody")}>
          <IconMC name="human-female" size={28} color="#ffff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_3 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("FaceSwap")}>
          <IconMI name="emoji-emotions" size={28} color="#ffff" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#ffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 200, 
    height: 700,
    marginBottom: 100,
  },
  circle: {
    backgroundColor: "#e32f45",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 85,
    right: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StyleStudio;
