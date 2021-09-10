import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#F66411',
        borderRadius: 4,
        padding: 5
      },
      systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
      }
        
})