import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Content = (props) => {
    return (
        <View style={styles.screen}>
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image source={props.profile} style={styles.profileImage} />
                </View>
                <Image
                    source={require('../../assets/icons/more.webp')}
                    style={styles.topIcon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{props.name}</Text>
                    <Text style={styles.timeText}>{props.time}</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image
                    source={props.image}
                    style={styles.contentImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.visibilityContainer}>
                    <Image
                        source={require('../../assets/icons/visibility.webp')}
                        style={styles.icon}
                    />
                    <Text style={styles.textIcon}>{props.view}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Image
                        source={require('../../assets/icons/messages.webp')}
                        style={styles.icon}
                    />
                    <Text style={styles.textIcon}>{props.comment}</Text>
                </View>
                <View style={styles.loveContainer}>
                    <Image
                        source={require('../../assets/icons/love.webp')}
                        style={styles.icon}
                    />
                    <Text style={styles.textIcon}>{props.love}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: "95%",
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ebebeb',
        marginRight: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    topIcon: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    nameText: {
        fontSize: 18,
        marginBottom: 2,
    },
    timeText: {
        fontSize: 14,
        color: 'grey',
    },
    contentContainer: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentImage: {
        width: '100%',
        height: '100%', 
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    visibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 5,
    },
    textIcon: {
        fontSize: 14,
    },
});

export default Content;
