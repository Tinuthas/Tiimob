import React, {useState, useEffect} from 'react';

import styles from './styles'

import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SectionList, SettingsListItem, SettingsListSectionHeader, Alert} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'



export default function Perfil({route, navigation}) {

    var [user, setUser] = useState(null)
    
    async function getUser() {
        if(user != undefined) return
        var id = ''
        var userRes = null
        await AsyncStorage.getItem('user').then(user => {
            console.log(`${user} user` )
            if(user) {
                id = user
            }else {
                navigation.navigate('Login')  
            }
        })
        try{
            var response = await api.get('/config', {
                headers: {
                    user: id
                }
            })
            userRes = response.data
            setUser(userRes)
        }catch(e) {
            navigation.navigate('Login') 
            console.log(e) 
            /*if(e.response.data != undefined)
                if(e.response.data.message != undefined) return Alert.alert(e.response.data.message)
            return Alert.alert(e.message)*/
        }
    }

    useEffect( () => {
        (async function() {
            try {
                if(user == undefined) {
                    await getUser()
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])



    async function handleExit() {
      await AsyncStorage.clear()
      navigation.navigate('Login')
    }

    return (
            <ScrollView style={styles.container}>
                {user != null && (
                    <View style={styles.viewFields}> 
                        <Text style={styles.textFieldTitle}>Nome</Text>
                        <View style={styles.viewDescription}>
                            <Text style={styles.textFieldDescription}>{user.name}</Text>
                        </View>
                        
                        <Text style={styles.textFieldTitle}>Email</Text>
                        <View style={styles.viewDescription}>
                            <Text style={styles.textFieldDescription}>{user.email}</Text>
                        </View>
                    </View>
                    
                )}

                <TouchableOpacity style={styles.buttonExit} onPress={handleExit}>
                    <Text style={styles.buttonExitText} >Sair</Text>
                </TouchableOpacity>
            </ScrollView>
    )
}


            