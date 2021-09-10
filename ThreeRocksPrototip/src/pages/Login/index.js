import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Platform, Text, Alert, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import logo from '../../assets/tiimob_logo_trans.png'
import styles from './styles'

export default function Login({ navigation}) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Home', {user})
            }
        })
    }, [])

    async function handleLogin() {

        if(user == '' || password == '') return
        var response = null
        try{
            response = await api.post('/user', {email: user, password})
        }catch(e) {
            if(e.response.data != undefined)
                if(e.response.data.message != undefined) return Alert.alert(e.response.data.message)
            return Alert.alert(e.message)
        }
        
        if(response == undefined) return Alert.alert('Erro connect');

        if(response.message != undefined) return Alert.alert(response.message)
        

        const {_id} = response.data

        await AsyncStorage.setItem('user', _id)

        const perfilResponse = await api.get('/form/perfil',{
            headers: {
                user: _id
            }
        })

        if(perfilResponse.data == null) {
            navigation.navigate('FormParameters', {user: _id})
        }else{
            navigation.navigate('Home', {user: _id})
        }
    }

    function handleRegister() {
        navigation.navigate('Register')
    }

    function getLocation(location) {
        //console.log(location)
        //console.log('deu certo')
        if(location == undefined) return
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
    }


    return (
        <KeyboardAvoidingView behavior="padding" enable= {Platform.OS === "ios"} style={styles.container}>
            <Image source={logo} />
            <View style={styles.itemsView}>
            <View style={styles.viewInput}>
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu email ou username" 
                    placeholderTextColor="#999"
                    value = {user}
                    onChangeText={setUser}
                    style={styles.input} />
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder="Digite sua senha" 
                    placeholderTextColor="#999"
                    value = {password}
                    onChangeText={setPassword}
                    style={styles.input} />
            </View>

            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText} >Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLight} onPress={handleRegister}>
                    <Text style={styles.buttonLightText} >Registrar</Text>
                </TouchableOpacity>
            </View>
            </View>
        </KeyboardAvoidingView>
    )
}
