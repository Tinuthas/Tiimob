import React, {useState, useEffect} from 'react';

import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, FlatList} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'


import styles from './styles'
import istamatch from '../../assets/itsamatch.png'

export default function Likes({route, navigation}) {
    
    const[id, setId] = useState(null)
    const [items, setItems] = useState([])
    const [refresh, setRefresh] = useState(false)

    async function getUser() {
        await AsyncStorage.getItem('user').then(user => {
            console.log(`${user} user` )
            if(user) {
                setId(user)
            }else {
                navigation.navigate('Login')
            }
        })
    }

   
    useEffect( () => {
        async function loadDetails() {
           
            console.log(`activate`)
            await onRefresh()
            
        }

        loadDetails()
    }, [id])

    async function onRefresh() {
        setRefresh(true)
        await getUser()
        const response = await api.get('/user/likes', {
            headers: {
                user: id
            }
        })
        setItems(response.data)
        setRefresh(false)
    }

    async function showDetails(item) {
        navigation.navigate('Details', {item, showMessage: true})

    }


    return (
        <View style={styles.container}>
           
             <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                data={items}
                renderItem={({item}) => (
                    
                    <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => showDetails(item)} >
                            <Image
                                style={styles.imageItem}
                                source={
                                    { uri: `${item.images[0]}` }
                                }
                            />
                            <Text style={styles.textItem}>{`${item.city} - ${item.neighborhood}`}</Text>
                        </TouchableOpacity>
                    </View>     
                )}
                keyExtractor={item => `${item._id}`}
                numColumns={2}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 20 }}
                onRefresh={() => onRefresh()}
                refreshing={refresh}
                />
            </SafeAreaView>
        </View>
    )
}