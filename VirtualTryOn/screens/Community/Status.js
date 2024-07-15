import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Status = ({ profile, name }) => {
    return (
        <View style={styles.screen}>
            <View style={styles.statusContainer}>
                <Image source={profile} style={styles.image} />
            </View>
            <Text style={styles.textStatus}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    statusContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ededed',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textStatus: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
});

export default Status;
