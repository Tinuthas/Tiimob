import React, {useState, useContext, useEffect} from 'react'
import {GiftedChat, Bubble, Send, SystemMessage} from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import { View, ActivityIndicator } from 'react-native';
import {database} from '../../config/firebase'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import styles from './styles'

export default function Room({navigation, route}) {

    const [messages, setMessages] = useState([])
    const { thread } = route.params;

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
            console.log(userRes)
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
                if(thread._id == null){
                    await getThreadId()
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])

    async function getThreadId() {
        await database.collection("THREADS")
        .where("name", "==", thread.name)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                thread._id = doc.id
                console.log(thread._id)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    async function handleSend(messages) {
        const text = messages[0].text;

        if(thread._id == null) {
            await getThreadId()
            if(thread._id == null) {
                await database
                .collection('THREADS')
                .add({
                    name: thread.name,
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                })
                /*.then(docRef => {
                    docRef.collection('MESSAGES').add({
                        text: `Iniciando conversa.`,
                        createdAt: new Date().getTime(),
                        system: true
                    });
                    thread._id = docRef._id
                });*/
                await getThreadId()
            }
        }
        

            await database
                .collection('THREADS')
                .doc(thread._id)
                .collection('MESSAGES')
                .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user._id,
                    email: user.email
                }
            });
    
  
            await database
                .collection('THREADS')
                .doc(thread._id)
                .set(
                {
                    latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            );
        
    }

    const messagesListener = database
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
    
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              };
    
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.email
                };
              }
    
              return data;
            });
    
            setMessages(messages);
    });

    useEffect(() => {
        
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
    }, []);

    function renderBubble(props) {
        return (
          // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                    // Here is the color change
                    backgroundColor: '#F66411'
                    },
                    left: {
                    backgroundColor: '#FFFFFF'
                    }
                }}
                textStyle={{
                    right: {
                    color: '#fff'
                    }
                }}
            />
        );
    }
    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#F66411' />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
          <View style={styles.bottomComponentContainer}>
            <IconButton icon='chevron-double-down' size={36} color='#F66411' />
          </View>
        );
    }

    function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#F66411' />
          </View>
        );
    }

    function renderSystemMessage(props) {
        return (
          <SystemMessage
            {...props}
            wrapperStyle={styles.systemMessageWrapper}
            textStyle={styles.systemMessageText}
          />
        );
      }

    return (
        ( user != null ? <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{_id: user._id, name: user.name }}
            renderBubble={renderBubble}
            placeholder='Digite sua mensagem aqui'
            showUserAvatar
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottomComponent={scrollToBottomComponent}
            renderLoading={renderLoading}
            renderSystemMessage={renderSystemMessage}
        /> : <View></View> )
    )


}