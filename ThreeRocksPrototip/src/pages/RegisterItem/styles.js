import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
    },
    viewInputs: {
        padding: 20,
    },
    viewDiviseInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewRowInputs: {
        width: '45%'
    },
    textLabel: {
        fontSize: 16,
        marginTop: 15,
         fontWeight: '600'
    },
    input: {
        width: '100%',
        fontSize: 15,
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        height: 30,
        paddingHorizontal: 5,
        borderRadius: 5,
    }

    
})