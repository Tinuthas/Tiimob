import React, {useState, useEffect} from 'react';

import styles from './styles'

import { KeyboardAvoidingView, View, Text, Image, Alert,TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'

import validator from 'validator'

import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

import Coords from '../../components/Coordinates'

//import logo from '../../assets/logo.png'

import logo from '../../assets/tiimob_logo_trans.png'


export default function Register({route, navigation}) {

    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)

    function getLocation(location) {
        //console.log(location)
        //console.log('deu certo')
        if(location == undefined) return
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
    }

    async function handleRegister() {
        try{
            if(user == '' || password == '' || name == '') return
            if(latitude == 0 || longitude == 0) return
            //if(!validator.isEmail(email)) return
            var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(regEmail.test(email) == 0) return
            console.log(email)
            var response = undefined
            try{
                response = await api.post('/register', {user, name, email, password, latitude, longitude})
            }catch(e) {
                console.log(e)
                if(e.response.data != undefined)
                    if(e.response.data.message != undefined) return Alert.alert(e.response.data.message)
                return Alert.alert(e.message)
            }
            console.log('passou')
            const {_id} = response.data

            await AsyncStorage.setItem('user', _id)

            const perfilResponse = await api.get('/form/perfil',{
                headers: {
                    user: _id
                }
            })
            console.log(`perfil ${perfilResponse}`)

            if(perfilResponse.data == null) {
                navigation.navigate('FormParameters', {user: _id})
            }else{
                navigation.navigate('Home', {user: _id})
            }
        }catch(err) {
            console.log(err)
        }
        
    }

    function handleBack() {
        navigation.goBack()
    }


    return (
        <KeyboardAvoidingView behavior="padding" enable= {Platform.OS === "ios"} style={styles.container}>
            <Image source={logo} />
            <View style={styles.viewInput}>
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu username" 
                    autoCompleteType="username"
                    placeholderTextColor="#999"
                    value = {user}
                    onChangeText={setUser}
                    style={styles.input} />
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu email" 
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    value = {email}
                    onChangeText={setEmail}
                    style={styles.input} />
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={true}
                    placeholder="Digite seu nome" 
                    placeholderTextColor="#999"
                    keyboardType="default"
                    autoCompleteType="name"
                    value = {name}
                    onChangeText={setName}
                    style={styles.input} />
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder="Digite sua senha" 
                    autoCompleteType="password"
                    placeholderTextColor="#999"
                    value = {password}
                    onChangeText={setPassword}
                    style={styles.input} />

                
            </View>
            <Coords onChange={getLocation}/>

            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText} >Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLight} onPress={handleBack}>
                    <Text style={styles.buttonLightText} >Voltar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}