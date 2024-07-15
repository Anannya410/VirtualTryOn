import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.screen}>
            <Image 
                source={require('../../assets/icons/plus.png')} 
                style={styles.image}
            />
            <Text style={styles.title}>Feed</Text>
            <Image
                source={require('../../assets/icons/more.webp')}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        marginTop: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#333333',
    },
    image: {
        width: 32,
        height: 32,
        tintColor: '#333333',
    },
});

export default Header;
