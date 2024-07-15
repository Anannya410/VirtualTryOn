import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyDashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>My Dashboard</Text>
        </View>
    );
};

export default MyDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
});

