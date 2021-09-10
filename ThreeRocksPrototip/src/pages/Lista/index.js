import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, FlatList} from 'react-native'
import Constants from 'expo-constants'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Likes from '../Likes'
import MyItems from '../MyItems'

const AppStack = createStackNavigator()

const Tab = createMaterialTopTabNavigator();


function MyTabsListItems() {
    return (
        <Tab.Navigator 
            style={{backgroundColor: '#e5e5e5'}}
            tabBarOptions={{
                activeTintColor: '#F66411',
                showIcon: true,
                showLabel: false,
                labelStyle: { fontSize: 0 },
                style: { backgroundColor: '#e5e5e5' },
                indicatorStyle: {
                    backgroundColor: '#F66411',
                }
            }}
            >
            <AppStack.Screen name="Likes" component={Likes} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="heart" size={24} color={tabInfo.focused ? '#F66411' : 'black'} />)}}/>
            <AppStack.Screen name="Meus" component={MyItems} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="send" size={22} color={tabInfo.focused ? '#F66411' : 'black'} />)}}/>
        </Tab.Navigator>
    );
}


export default function Lista({route, navigation}) {

    async function handleFilter(){

    }

    async function handleCreate(){
        navigation.navigate('RegisterItem')
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewInfo}>
                <TouchableOpacity style={styles.button} onPress={handleFilter}>
                    <Text style={styles.buttonText}>Filtrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
            {MyTabsListItems()}
        </View>
    )
}