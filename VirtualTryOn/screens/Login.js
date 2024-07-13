// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import api from '../api/user_data_api';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     try {
//       const response = await api.login(username, password);
//       Alert.alert('Login successful!');
//       // Handle token or login state here
//       // navigation.navigate('YourNextScreen');
//     } catch (error) {
//       Alert.alert('Login failed!', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Login" onPress={handleLogin} />
//       <Text style={styles.registerText} onPress={() => navigation.navigate('Registration')}>
//         Don't have an account? Register here.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 10,
//   },
//   registerText: {
//     color: 'blue',
//     marginTop: 15,
//     textAlign: 'center',
//   },
// });

// export default Login;
