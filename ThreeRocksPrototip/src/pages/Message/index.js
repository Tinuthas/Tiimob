import React, {useState, useEffect} from 'react';

import styles from './styles'

import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, FlatList} from 'react-native'
import { List, Divider } from 'react-native-paper';
//import firestore from '@react-native-firebase/firestore';
import {database} from '../../config/firebase'

export default function Message({route, navigation}) {
    
    const [loading, setLoading] = useState(true);
    const [threads, setThreads] = useState([])
    
    useEffect(() => {
        const unsubscribe = database
          .collection('THREADS')
          .orderBy('latestMessage.createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const threads = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                // give defaults
                name: '',
                latestMessage: {
                    text: ''
                },
                ...documentSnapshot.data()
              };
            });
            setThreads(threads);
    
            if (loading) {
              setLoading(false);
            }
          });
    
        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);
    
    if (loading) {
        return (
            <View style={styles.containsLoading}>
                <ActivityIndicator size="small" color="#F66411" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Room', { thread: item })}
                >
                    <List.Item
                        title={item.name}
                        description={item.latestMessage.text}
                        titleNumberOfLines={1}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={1}
                    />
                </TouchableOpacity>
                )}
            />
        </View>
    )
}