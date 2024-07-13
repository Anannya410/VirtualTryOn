// import React, { useState } from "react";
// import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";

// const StyleStudio = () => {
//   const [icon_1] = useState(new Animated.Value(85));
//   const [icon_2] = useState(new Animated.Value(85));
//   const [pop, setPop] = useState(false);
//   const navigation = useNavigation();

//   const popIn = () => {
//     setPop(true);
//     Animated.timing(icon_1, {
//       toValue: 85,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_2, {
//       toValue: 85,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   };

//   const popOut = () => {
//     setPop(false);
//     Animated.timing(icon_1, {
//       toValue: 160,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_2, {
//       toValue: 235,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
//         <TouchableOpacity onPress={() => navigation.navigate("/")}>
//           <IconMC name="wardrobe-outline" size={28} color="#ffff" />
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
//         <TouchableOpacity onPress={() => navigation.navigate("ChooseBody")}>
//           <IconMC name="human-female" size={28} color="#ffff" />
//         </TouchableOpacity>
//       </Animated.View>
//       <TouchableOpacity
//         style={styles.circle}
//         onPress={() => {
//           pop === false ? popIn() : popOut();
//         }}
//       >
//         <Icon name="plus" size={25} color="#ffff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default StyleStudio;

// const styles = StyleSheet.create({
//   circle: {
//     backgroundColor: "#e32f45",
//     width: 60,
//     height: 60,
//     position: "absolute",
//     bottom: 85,
//     right: 25,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getLatestAvatar } from '../api/body_resize_api.js';

const StyleStudio = () => {
  const navigation = useNavigation();
  const [icon_1] = useState(new Animated.Value(85));
  const [icon_2] = useState(new Animated.Value(85));
  const [pop, setPop] = useState(false);
  const [latestAvatar, setLatestAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState('');

  const fetchLatestAvatar = async () => {
    try {
      const { avatar, name } = await getLatestAvatar();
      setLatestAvatar(avatar);
      setAvatarName(name);
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
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Style Studio</Text>
        {latestAvatar ? (
          <>
            <Image
              source={{ uri: `data:image/png;base64,${latestAvatar}` }}
              style={styles.avatarImage}
              resizeMode="contain"
            />
            <Text style={styles.imageName}>{avatarName}</Text>
          </>
        ) : (
          <Text>No avatar saved yet.</Text>
        )}
      </View>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("/")}>
          <IconMC name="wardrobe-outline" size={28} color="#ffff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("ChooseBody")}>
          <IconMC name="human-female" size={28} color="#ffff" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  imageName: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 20,
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


