import React, {useState, useEffect} from 'react';

import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView} from 'react-native'
import ViewSlider from 'react-native-view-slider'
import MapView, { Marker } from "react-native-maps";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { IconButton } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {database} from '../../config/firebase'
import api from '../../services/api'
import styles from './styles'

export default function Details({route, navigation}) {

    var item = route.params.item
    var showMessage = route.params.showMessage
    console.log(item)
    console.log(`item id ${item._id}`)

    const [region, setRegion] = useState({
        latitude: item.location.coordinates[0],
        longitude: item.location.coordinates[1],
        latitudeDelta: 0.029,
        longitudeDelta: 0.029
      });
    function handleBack() {
        navigation.goBack()
    }

    function handleContactWhats() {

    }

    function handleContactMessage() {
       
        navigation.navigate('Room', {thread: {name: item.userReference != null ? item.userReference : 'vinicius', details: true}});
    
    }


    return (
            <ScrollView style={styles.container}>
                <View style={styles.viewImages}>
                    <View style={styles.containerSlider}>
                        <ViewSlider 
                            renderSlides = {
                            <>
                                { item.images.map((image, index) => (
                                    <View key={index} style={styles.containerImageShow}>
                                        <Image style={styles.avatar} source={{uri: image}} />
                                    </View>
                                
                                
                                ))}
                            </>
                        }
                        style={styles.slider}     //Main slider container style
                        height = {350}    //Height of your slider
                        slideCount = {item.images.length}    //How many views you are adding to slide
                        dots = {false}     // Pagination dots visibility true for visibile 
                        dotActiveColor = 'red'     //Pagination dot active color
                        dotInactiveColor = 'gray'    // Pagination do inactive color
                        dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
                        //autoSlide = {true}    //The views will slide automatically
                        //slideInterval = {1000}    //In Miliseconds
                        />
                        </View>
                </View>
                <View style={styles.viewInfo}>
                    <View style={styles.viewInputText}>
                        <Text style={styles.textDescription}>Tipo:</Text>
                        <Text style={styles.textResult}>{item.typeUnit}</Text>
                    </View>
                    <View style={styles.viewInputText}>
                        <Text style={styles.textDescription}>Localização:</Text>
                        <Text style={styles.textResult}>{`${item.city} - ${item.neighborhood}`}</Text>
                    </View>
                    <View style={styles.viewContainsColumns}>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>Quartos:</Text>
                            <Text style={styles.textResult}>{`${item.rooms}`}</Text>
                        </View>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>Suites:</Text>
                            <Text style={styles.textResult}>{`${item.suites}`}</Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={styles.viewContainsColumns}>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>Vagas:</Text>
                            <Text style={styles.textResult}>{`${item.carSpace}`}</Text>
                        </View>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>Banheiros:</Text>
                            <Text style={styles.textResult}>{`${item.toilet}`}</Text>
                        </View>
                    </View>
                    <View style={styles.viewContainsColumns}>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>Area Total:</Text>
                            <Text style={styles.textResult}>{`${item.area} m²`}</Text>
                        </View>
                        <View style={styles.viewInputTextColumns}>
                            <Text style={styles.textDescription}>CEP:</Text>
                            <Text style={styles.textResult}>{`${item.cep}`}</Text>
                        </View>
                    </View>    
                    { item.value > 500000 ?
                        <View style={styles.viewInputText}>
                            <Text style={styles.textDescription}>Corretora:</Text>
                            <Text style={styles.textResult}>{`${'BuscaImóveis'}`}</Text>
                        </View>
                    : null }
                    
                    <View style={styles.viewInputText}>
                            <Text style={styles.textDescription}>Valor:</Text>
                            <Text style={styles.textResult}>{`${parseFloat(item.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</Text>  
                    </View>
                    <View style={styles.viewInputText}>
                        <Text style={styles.textDescription}>Condomínio:</Text>
                        <Text style={styles.textResult}>{`${parseFloat(item.valueCond).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</Text>
                    </View>
                   

                    
                </View>

                <MapView
                    style={{ flex: 1, height: 340, marginTop: 20,  }}
                    region={region}
                    onRegionChangeComplete={region => setRegion(region)}
                    >
                    <Marker coordinate={{ latitude: item.location.coordinates[0], longitude: item.location.coordinates[1] }} />
                </MapView>
                {showMessage ? 
                <View style={styles.containerContact}>
                    <Text style={styles.textContact}>Contato</Text>
                    <TouchableOpacity style={styles.contactButton} onPress={handleContactWhats}>
                        <Text style={styles.textIconContact}>Whatsapp</Text>
                        <AwesomeIcon name="whatsapp" size={35} color="#25D366" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={handleContactWhats}>
                        <Text style={styles.textIconContact}>E-mail</Text>
                        <MaterialCommunityIcons name="email" size={35} color="#006AFF"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={handleContactMessage}>
                        <Text style={styles.textIconContact}>Mensagem</Text>
                        <IconButton style={{width:35, margin: 0}} icon='send-circle' size={35} color='#F66411' />
                    </TouchableOpacity>
                </View>
                : <View></View>}
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
    )
}


/*var id = 1

    useEffect( () => {
        async function loadDetails() {
            return
            //if(responseForm != undefined && responseForm.typeUnit != undefined) return
            const response = await api.get('/form/preference', {
                headers: {
                    user: id
                }
            })

         
            //var responseList = response.data
            
        }

        loadDetails()
    }, [id])
    */