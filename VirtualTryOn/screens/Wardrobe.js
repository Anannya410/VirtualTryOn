import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Wardrobe = () => {
  const [icon_1] = useState(new Animated.Value(85));
  const [icon_2] = useState(new Animated.Value(85));
  const [pop, setPop] = useState(false);
  const navigation = useNavigation();

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
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("/")}>
          <IconMC name="wardrobe-outline" size={28} color="#ffff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("AvatarCreator")}>
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

export default Wardrobe;

const styles = StyleSheet.create({
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
