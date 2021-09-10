import React, {useState, useEffect} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native'

import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'

import RNPickerSelect from 'react-native-picker-select';

import Slider from '@react-native-community/slider';

import AppIntroSlider from 'react-native-app-intro-slider';

import Icon from 'react-native-vector-icons/Ionicons';

import {createAlert} from '../../utils/alert'

import api from '../../services/api'


import styles from './styles'
import { data } from 'browserslist';

export default function FormParameters({route, navigation}) {
    console.log(route)
    console.log(route.params)
    const id = route.params.user
    const [originForm, setOriginForm] = useState([])
    const [form, setForm] = useState([])
    const [responseForm, setResponseForm] = useState({})

    const slides = [
        {
          key: 1,
          title: 'Parte 1',
          backgroundColor: '#59b2ab',
        },
        {
          key: 2,
          title: 'Parte 2',
          backgroundColor: '#febe29',
        },
        {
          key: 3,
          title: 'Parte 3',
          backgroundColor: '#22bcb5',
        }
      ];

      
const pickerStyle = {
    inputIOS: {
        padding: 10,
        fontSize: 20,
    },
    inputAndroid: {
        padding: 10,
        fontSize: 20,
    },
    placeholder: { 
        color:'#888888'
    }
};
    const updateField = e => {
        console.log()
        setResponseForm({
        ...responseForm,
        [e.name]: e.value
    });
    };

    async function navigationSend() {
        if(responseForm == undefined) return
        if(form == undefined) return
        var columns = Object.keys(responseForm)
       
        for(var column of columns) {
            if(responseForm[column] === 0) continue
            if(responseForm[column] == undefined || responseForm[column] == null || responseForm[column] == '') {
                return (createAlert('Campos inválidos', 'Preencha todos os campos'))
            }
        }

        var columnsForm = Object.keys(originForm)
        for(var column of columnsForm) {
            if(column == 'typeUnit') continue;
            if(responseForm[`min${column}`] > responseForm[`max${column}`]) {
                return (createAlert('Campos inválidos', 'Valores de escala Mínimo e Máximo incorretos'))
            }
        }
        console.log(id)
        responseForm._id = id
        console.log(responseForm)
        const response = await api.post('/form/perfil', responseForm, {
            headers: {
                user: id
            }
        })
        console.log(response.data)
        if(response.data.message != undefined) 
            return (createAlert('Ocorreu algum problema', response.data.message))

        if(response.data._id == id) { 
            navigation.navigate('Home', {user: id})
        }
    }

    function labelSelectDropdown() {
        if(form.typeUnit == undefined) return;
        var listUnit = form.typeUnit
        var label = ['Apartamento', 'Condomínio', 'Plano', 'Casa', 'Kitnet', 'Loft', 'PentHouse', 'Casa de Dois Andares', 'Casa de Aldeia']
        var listLabel = []
        for(var i in listUnit) {
            listLabel.push({label: label[i], value: listUnit[i]})
        }
        return listLabel
    }

    function sliderSelector(column, text, description) {
        return(
            form[column] != undefined) && (
                <View style={styles.rowView}> 
                    <Text style={styles.rowText}>{text}: {responseForm[column]} {description}</Text>
                    <Slider
                        style={styles.rowSlider}
                        minimumValue={form[column][0]}
                        maximumValue={form[column][form[column].length - 1]}
                        step={form[column][1] - form[column][0]}
                        onValueChange={(value) => {
                            updateField({name: column, value: value})
                        }}
                        minimumTrackTintColor="#DF4723"
                        maximumTrackTintColor="#e3e3e3"
                    />
                </View>
            )
    }

    useEffect( () => {
        async function loadForm() {
           
            if(responseForm != undefined && responseForm.typeUnit != undefined) return
            const response = await api.get('/form/preference', {
                headers: {
                    user: id
                }
            })

            // NOT BEST SOLUTION
            //const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

            //setUsers(shuffleArray(response.data))
            var responseForm = response.data
            setOriginForm(responseForm)
            var columnForm = Object.keys(responseForm)
            if(columnForm.indexOf('typeUnit') > 0) {
                columnForm.splice(columnForm.indexOf('typeUnit'), 1)
                columnForm.unshift('typeUnit');
            }
            
            var dataResult = {}
            for (var column of columnForm) {
                if(responseForm[column].length > 0) {                    
                    if(typeof responseForm[column][0] == 'string') {
                        dataResult[column] = responseForm[column]
                       
                    }else {
                        dataResult['min' + column] = responseForm[column]
                        dataResult['max' + column] = responseForm[column]
                    }
                }
               
            }
            var responseFormData = {}
            for (var column of Object.keys(dataResult)) {
                responseFormData[column] = dataResult[column][0]
            }
            setResponseForm(responseFormData)
            setForm(dataResult)
        }

        loadForm()
    }, [id])


    _renderItem = ({ item }) => {
            return (
                <View >   
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {
                            item.key == 1 ?
                            <View>
                                <View >     
                                    <View style={styles.rowViewTitle}>
                                        <Text style={styles.rowTextTitle}>{item.title}</Text>
                                    </View>
                                    
                                    <View style={styles.rowViewSelect}>
                                        <RNPickerSelect
                                            style={pickerStyle}
                                            placeholder={{label: 'Selecione um tipo...',value: null}}
                                            onValueChange={(value) => updateField({name: 'typeUnit', value: value})}
                                            items={labelSelectDropdown()}
                                        /> 
                                    </View>
                                     
                                    {sliderSelector('minareaUtil', 'Area Util Minima', 'm²')}
                                    {sliderSelector('maxareaUtil', 'Area Util Maxima', 'm²')}
                                    {sliderSelector('minareaExt', 'Area Externa Minima', 'm²')}
                                    {sliderSelector('maxareaExt', 'Area Externa Maxima', 'm²')}
                                </View>         
                            </View>
                            : item.key == 2 ? 
                            <View>
                                <View style={styles.rowViewTitle}>
                                    <Text style={styles.rowTextTitle}>{item.title}</Text>
                                </View>
                                {sliderSelector('mincarSpace', 'Vagas de Carro Minima')}
                                {sliderSelector('maxcarSpace', 'Vagas de Carro Maxima')}
                                {sliderSelector('minrooms', 'Quarto Minima')}
                                {sliderSelector('maxrooms', 'Quarto Maxima')}
                                {sliderSelector('minsuites', 'Suites Minima')}
                                {sliderSelector('maxsuites', 'Suites Maxima')}
                            </View>
                            : 
                            <View>
                                <View style={styles.rowViewTitle}>
                                    <Text style={styles.rowTextTitle}>{item.title}</Text>
                                </View>
                                {sliderSelector('mintoilet', 'Banheiro Minima')}
                                {sliderSelector('maxtoilet', 'Banheiro Maxima')}
                                {sliderSelector('minvalue', 'Valor Minima', 'reais')}
                                {sliderSelector('maxvalue', 'Valor Maxima', 'reais')}
                                {sliderSelector('minvalueCond', 'Valor Condomínio Minima', 'reais')}
                                {sliderSelector('maxvalueCond', 'Valor Condomínio Maxima', 'reais')}
                            </View> 
                        }
                    </ScrollView>
                </View>
            )
      }
      _renderNextButton = () => {
        return (
        <View style={styles.buttonCircle}>
            <Icon
              name="arrow-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      _renderDoneButton = () => {
        return (
            <TouchableOpacity style={styles.button} onPress={navigationSend}>
                <Text style={styles.buttonText} >Enviar</Text>
            </TouchableOpacity>
        );
      };

      return (
        <View style={styles.container}>
            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>Calibragem de Preferências</Text>
            </View>
            { (form != [] && form != undefined && form.typeUnit != undefined) && (
            <AppIntroSlider
                style={styles.appIntroSlider}
                data={slides}
                activeDotStyle={{backgroundColor: '#DF4723'}}
                renderItem={_renderItem}
                renderNextButton={_renderNextButton}
                renderDoneButton={_renderDoneButton}
            />
            )}
            <View>
                
            </View>
       </View>
      )
}

/*
                
             

*/