// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const PostScreen = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Text>Post Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => alert('Button Clicked')}
//             />
//         </View>
//     );
// };

// export default PostScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcbbc'
//     }
// });


// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';

// const PostScreen = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const apiUrl = 'http://192.168.103.162:8000/api/image_manager/list-images/'; // Replace with your actual endpoint
//     console.log('Fetching images from:', apiUrl);
    
//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Fetched images:', data);
//         setImages(data.images);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching images:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error loading images</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {images.map((item, index) => (
//         <View key={index} style={styles.imageContainer}>
//           <Image
//             source={{ uri: `data:image/jpeg;base64,${item.image_base64}` }}
//             style={styles.image}
//           />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//   },
// });

// export default PostScreen;




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const PostScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http:// 192.168.103.162:8000/api/image_manager/list-images/')
      .then(response => {
        setImages(response.data.images);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleImagePress = (image) => {
    navigation.navigate('MyDashboard', { image });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.image_name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default PostScreen;
