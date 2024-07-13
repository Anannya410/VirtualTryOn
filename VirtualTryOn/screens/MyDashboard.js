// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const MyDashboard = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Text>My Dashboard</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => alert('Button Clicked')}
//             />
//         </View>
//     );
// };

// export default MyDashboard;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcbbc'
//     }
// });


import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MyDashboard = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.image_url }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default MyDashboard;
