import React, {useState, useEffect} from 'react';

import styles from './styles'

import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SectionList, SettingsListItem, SettingsListSectionHeader, Alert} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'



export default function RegisterItem({route, navigation}) {

    const[user, setUser] = useState(undefined)
 
    useEffect( () => {
        (async function() {
            try {
                if(user == undefined) {
                    await AsyncStorage.getItem('user').then(user => {
                        console.log(`${user} user` )
                        if(user) {
                            
                        }else {
                            navigation.navigate('Login')  
                        }
                    })
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])




    return (
            <ScrollView style={styles.container}>
                 <Text>Localização</Text>
                <View style={styles.viewInputs}>

                   
                    <Text>Tipo de Imóvel:</Text>

                    <View style={styles.viewDiviseInputs}>
                        <View style={styles.viewRowInputs}>
                            <Text style={styles.textLabel}>Cidade:</Text>
                            <TextInput 
                                autoCorrect={true}
                                placeholder="Digite sua cidade" 
                                placeholderTextColor="#999"
                                value = {user}
                                onChangeText={setUser}
                                style={styles.input} />
                        </View> 
                        <View style={styles.viewRowInputs}>
                            <Text style={styles.textLabel}>Estado:</Text>
                            <TextInput 
                                autoCorrect={true}
                                placeholder="Digite sigla estado" 
                                placeholderTextColor="#999"
                                value = {user}
                                onChangeText={setUser}
                                maxLength={2}
                                style={styles.input} />
                        </View>
                    </View>
                    <Text style={styles.textLabel}>Rua:</Text>
                    <TextInput 
                            autoCorrect={true}
                            placeholder="Digite sua rua" 
                            placeholderTextColor="#999"
                            value = {user}
                            onChangeText={setUser}
                            style={styles.input} />
                    <View>
                        <Text>Bairro:</Text>
                        <Text>Número:</Text>
                    </View>
                    <View>
                        <Text>CEP:</Text>
                        <Text>Área:</Text>
                    </View>
                    <View>
                        <Text>Banheiros:</Text>
                        <Text>Suites:</Text>
                    </View>
                    <View>
                        <Text>Quartos:</Text>
                        <Text>Vagas:</Text>
                    </View>
                    <View>
                        <Text>Valor:</Text>
                        <Text>Valor Condomínio:</Text>
                    </View>
                    
                </View>
                <Text>Images</Text>
            </ScrollView>
    )
}


            