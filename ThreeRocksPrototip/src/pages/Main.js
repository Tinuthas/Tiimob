import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
import {SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity,  Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import ViewSlider from 'react-native-view-slider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import api from '../services/api'
import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

const { width, height } = Dimensions.get('window');


export default function Main({route, navigation}) {

    const [id, setId] = useState('')

    async function getUser() {
        var closeUser = false
        await AsyncStorage.getItem('user').then(user => {
            console.log(`${user} user` )
            if(user) {
                setId(user)
            }else {
                navigation.navigate('Login')
                closeUser = true
            }
            
        })
        return closeUser 
    }

    const [items, setItems] = useState([])

    console.log(id)
    useEffect( () => {
        async function loadItems() {
           
            if(await getUser()) return

            const response = await api.get('/items', {
                headers: {
                    user: id
                }
            })
            setItems(response.data)
        
        }
        loadItems()
    }, [id])

    
    useEffect( () => {
        async function loadItems() {
            if(items.length > 1) return
            const response = await api.get('/items', {
                headers: {
                    user: id
                }
            })


            //const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

            //setUsers(shuffleArray(response.data))
            setItems(response.data)
            
        }

        loadItems()
    }, [items])

    /*useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: {user: id}
        })
        
        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [id])*/

    async function handleLike() {
        if(id == null) return
       
        const [ item, ...rest] = items
        await api.post(`/user/${item._id}/likes`, null, {
            headers: {user: id}
        })
        setItems(rest)
    }

    async function handleDislike() {
        if(id == null) return
        const [ item, ...rest] = items

        await api.post(`/user/${item._id}/dislikes`, null, {
            headers: {
                user: id
            }
        })

        setItems(rest)
    }

    async function showDetails(item) {
        navigation.navigate('Details', {item, showMessage: false})

    }

    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container} >
           
            
            { items.length === 0 
                ? <View style={styles.containerEmpty}>
                        <Text style={styles.empty}>{'Acabou :('}</Text> 

                    </View>
                : <View style={styles.cardsContainer}>
                        { items.map((item, index) => (
                            <View key= {parseInt(item._id)} style={[styles.card, {zIndex: items.length - index}]}>
                        
                            <View style={styles.containerSlider}>
                                <ViewSlider 

                                    renderSlides = {
                                        //<Image style={styles.avatar} source={{uri: image}} />
                                    <>
                                        { item.images.map((image, index) => (
                                            <View key={index} style={styles.containerImageShow}>
                                                <Image style={styles.avatar} source={{uri: image}} />
                                            </View>
                                        
                                        
                                        ))}
                                    </>
                                }
                                style={[styles.slider,  {zIndex: items.length - index}]}     //Main slider container style
                                //height = {200}    //Height of your slider
                                slideCount = {item.images.length}    //How many views you are adding to slide
                                dots = {false}     // Pagination dots visibility true for visibile 
                                dotActiveColor = 'red'     //Pagination dot active color
                                dotInactiveColor = 'gray'    // Pagination do inactive color
                                dotsContainerStyle={[styles.dotContainer,  {zIndex: items.length - index}]}     // Container style of the pagination dots
                                //autoSlide = {true}    //The views will slide automatically
                                //slideInterval = {1000}    //In Miliseconds
                                />
                            </View>
                            <View style={styles.footer}>
                            <TouchableOpacity onPress={() => showDetails(item)} style={styles.touchableDetails}>
                                <View>
                                    <Text style={styles.name}>{item.typeUnit}</Text>
                                    <Text numberOfLines={3} style={styles.bio}>{`${item.city} - ${item.neighborhood}`}</Text>
                                </View>
                                <View style={styles.iconRealState}>
                                    {item.value > 500000 ?
                                        <FontAwesome5 name="handshake" size={30} color="#3e3e3e" /> 
                                    : null }
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                        ))}  
                    </View>
            }
               
          
            { items.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}

            {/*matchDev && (
                <TouchableOpacity style={styles.matchContainer} onPress={()=> setMatchDev(null)}>
                    <Image style={styles.matchImage} source={itsamatch} />
                    <Image style={styles.matchAvatar} source={{uri: matchDev.avatar}} />
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    <Text style={styles.closeMatch}>FECHAR</Text>
                </TouchableOpacity>
            )*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        height: '100%',
    },
    logo: {
            marginTop: 30,
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        //maxHeight: 580,
    },
    card: {
        width: width,
        overflow: 'hidden',
        position: 'absolute',
        height: '100%'
    },
    avatar: {
        flex: 1,
        width: width,
        height: '100%',
        backgroundColor: '#DDD'
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: '15%'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bio: {
        fontSize: 14, 
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        flexDirection: 'row',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2, 
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    containerEmpty: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
    matchContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    matchImage: {
        height: 60,
        resizeMode: 'contain',
    },

    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius:80,
        borderWidth:5,
        borderColor: '#FFF',
        marginVertical: 30,
    },

    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
    },

    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30,
    },

    closeMatch: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    },

    containerSlider: {
        height: '85%'
    },

    slider: {
        width: width,
        backgroundColor: '#FFF',
        height: '100%'
    },

    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5
      },
      containerImageShow: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: width,
      },

      touchableDetails: {
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      iconRealState: {
        width: 40,
        justifyContent: 'center',
        height: '100%'
      }
      

})


/*
<TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
*/