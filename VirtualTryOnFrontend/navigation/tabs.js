import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Community from "../screens/Community/Community";
import MyDashboard from "../screens/MyDashboard";
import FashionScreen from "../screens/FashionScreen";
import StyleStudio from "../screens/StyleStudio";
import Wardrobe from "../screens/Wardrobe";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{
            display: 'flex',
            position: 'absolute',
            elevation: 0,
            backgroundColor: '#ffffff',
            height: 60,
            ...styles.shadow
        },
        tabBarLabelStyle:{
            display: 'none',
        },
        headerShown: false
      }}
    >
      <Tab.Screen name="StyleStudio" component={StyleStudio} options={{
        tabBarIcon: ({focused})=>(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/icons/dress.png')}
              resizeMode = 'contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused? '#e32f45' : '#000000',
              }}
            />
            <Text style={{color: focused? '#e32f45' : '#000000', fontSize: 10 }}>
              Studio
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Wardrobe" component={Wardrobe} options={{
        tabBarIcon: ({focused})=>(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/icons/clothing-hanger.png')}
              resizeMode = 'contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused? '#e32f45' : '#000000',
              }}
            />
            <Text style={{color: focused? '#e32f45' : '#000000', fontSize: 10 }}>
              Wardrobe
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Community" component={Community} options={{
        tabBarIcon: ({focused})=>(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/icons/heart.png')}
              resizeMode = 'contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused? '#e32f45' : '#000000',
              }}
            />
            <Text style={{color: focused? '#e32f45' : '#000000', fontSize: 10 }}>
              Community
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="FashionScreen" component={FashionScreen} options={{
        tabBarIcon: ({focused})=>(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/icons/catwalk.png')}
              resizeMode = 'contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused? '#e32f45' : '#000000',
              }}
            />
            <Text style={{color: focused? '#e32f45' : '#000000', fontSize: 10 }}>
              Runway
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="DashBoard" component={MyDashboard} options={{
        tabBarIcon: ({focused})=>(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/icons/dashboard.png')}
              resizeMode = 'contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused? '#e32f45' : '#000000',
              }}
            />
            <Text style={{color: focused? '#e32f45' : '#000000', fontSize: 10 }}>
              dashboard
            </Text>
          </View>
        )
      }}/>
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});


<a href="https://www.flaticon.com/free-icons/marketing" title="marketing icons">Marketing icons created by Freepik - Flaticon</a>