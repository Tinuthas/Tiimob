import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants'


import Login from './pages/Login'
import Main from './pages/Main'
import FormParameters from './pages/FormParameters'
import Details from './pages/Details'
import Lista from './pages/Lista'
import Likes from './pages/Likes'
import MyItems from './pages/MyItems'
import Message from './pages/Message'
import Room from './pages/Room'
import Perfil from './pages/Perfil'
import Register from './pages/Register'
import RegisterItem from './pages/RegisterItem'


import Ionicons from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator()

const Tab = createMaterialTopTabNavigator();

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

LogBox.ignoreAllLogs();

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


function MyTabs() {
  return (
    <Tab.Navigator 
        style={{paddingTop: Constants.statusBarHeight, backgroundColor: '#e5e5e5'}}
        tabBarOptions={{
            activeTintColor: '#df4723',
            showIcon: true,
            showLabel: false,
            labelStyle: { fontSize: 0 },
            style: { backgroundColor: '#e5e5e5' },
            indicatorStyle: {
                backgroundColor: '#F66411',
            }
        }}>
        <AppStack.Screen name="Home" component={Main} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="home" size={24} color={tabInfo.focused ? '#F66411' : 'black'} />)}} />
        <AppStack.Screen name="Lista" component={Lista} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="albums-outline" size={24} color={tabInfo.focused ? '#F66411' : 'black'} />)}}/>
        <AppStack.Screen name="Mensagens" component={Message} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="chatbox-ellipses-outline" size={24} color={tabInfo.focused ? '#F66411' : 'black'} />)}}/>
        <AppStack.Screen name="Perfil" component={Perfil} options={{ tabBarIcon:(tabInfo) => (<Ionicons name="settings-outline" size={24} color={tabInfo.focused ? '#F66411' : 'black'} />)}}/>
    </Tab.Navigator>
  );
}

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#F66411'
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 22
                }}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="FormParameters" component={FormParameters} />
                <AppStack.Screen name="Home" component={MyTabs} />
                <AppStack.Screen name="Details" component={Details}/>
                <AppStack.Screen name="Register" component={Register}/>
                <AppStack.Screen name="RegisterItem" component={RegisterItem} options={({ route }) => ({ title: 'Registrar Imóvel', headerShown: true})}/>
                <AppStack.Screen name="Room" component={Room} options={({ route }) => ({ title: route.params.thread.name, headerShown: true})}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}