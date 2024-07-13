// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getLatestAvatar } from '../api/body_resize_api.js';

// const Wardrobe = () => {
//   const navigation = useNavigation();
//   const [latestAvatar, setLatestAvatar] = useState(null);
//   const [avatarName, setAvatarName] = useState('');

//   const fetchLatestAvatar = async () => {
//     try {
//       const { avatar, name } = await getLatestAvatar();
//       setLatestAvatar(avatar);
//       setAvatarName(name);
//     } catch (error) {
//       console.error('Error fetching latest avatar:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLatestAvatar();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Style Studio</Text>
//       {latestAvatar ? (
//         <>
//           <Image
//             source={{ uri: `data:image/png;base64,${latestAvatar}` }}
//             style={styles.avatarImage}
//             resizeMode="contain"
//           />
//           <Text style={styles.imageName}>{avatarName}</Text>
//         </>
//       ) : (
//         <Text>No avatar saved yet.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   avatarImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 10,
//   },
//   imageName: {
//     fontSize: 18,
//     fontWeight: 'normal',
//     marginBottom: 20,
//   },
// });

// export default Wardrobe;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getLatestAvatar } from '../api/body_resize_api.js';

const Wardrobe = () => {
  const navigation = useNavigation();
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

  return (
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
});

export default Wardrobe;
