import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Community = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from your API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postDescription: {
    padding: 10,
  },
});

export default Community;
