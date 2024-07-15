import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FashionScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Fashion Show</Text>
        </View>
    );
};

export default FashionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
});

