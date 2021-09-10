import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#e5e5e5'
    },
    viewInfo: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
    button: {
        height: 46,
        width: '40%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#F66411',
        fontWeight: 'bold',
        fontSize: 16,
    },
})