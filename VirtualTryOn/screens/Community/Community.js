import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView, Text, Alert } from "react-native";
import Content from "./CommunityContent.js";
import Footer from "./Footer";

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://10.0.2.2:8000/api/wardrobe_manager/outfits/"
        );
        const data = await response.json();
        if (response.ok) {
          setImages(data);
        } else {
          console.error("Failed to fetch images", data);
          Alert.alert("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images", error);
        Alert.alert("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View >
          {images.map((image, index) => (
            <View key={index} style={styles.contentContainer}>
              <Content
            profile={require("../../assets/img/profile/images2.jpg")}
            name="Steven"
            time="20 min ago"
            image={{ uri: `data:image/png;base64,${image.image_data}` }}
            view="103"
            love="20"
            comment="53"
          />
              <Text>{image.image_name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  statusScroll: {
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
});

export default Community;
