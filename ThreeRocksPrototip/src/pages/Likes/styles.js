import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#e5e5e5'
    },
    imageItem: { 
        width: '100%', 
        height: 250,
        borderRadius: 5,
    },
    textItem: { 
        textAlign: "center", 
        marginTop: 8,
        color: '#3e3e3e',
        fontSize: 16
    },
})