import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    viewInput: {
        paddingHorizontal: 30,
        width: '100%'
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#F66411',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonLight: {
        height: 46,
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLightText: {
        color: '#F66411',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonsView: {
        paddingHorizontal: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})