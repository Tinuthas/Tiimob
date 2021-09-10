import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
    },
    containerScroll: {
        backgroundColor: '#e5e5e5',
        height: 600
    },
    buttonExit: {
        width: 'auto',
        height: 50,
        backgroundColor: '#F66411',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 30,

    },
    buttonExitText: {
        fontSize: 16,
        color: '#e5e5e5',
        fontWeight: 'bold'
    },
    viewFields: {
        paddingHorizontal: 20,
        marginTop: 10,
        justifyContent: 'center'
    },
    textFieldTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#3e3e3e'
        
    },
    viewDescription: {
        marginTop: 5,
        borderColor: '#3e3e3e',
        borderRadius: 4,
        borderWidth: 1,
        height: 30,
        justifyContent: 'center'
    },
    textFieldDescription: {
        fontSize: 16,
        marginStart: 5,
        color: '#3e3e3e'
    }


    
})