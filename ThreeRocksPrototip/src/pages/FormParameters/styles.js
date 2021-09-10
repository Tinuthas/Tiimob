import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 15,
        backgroundColor: '#e5e5e5'
    },
    viewTitle: {
        margin: 20
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    appIntroSlider: {
        margin: 30,
    },
    rowViewTitle: {
        marginBottom: 20,
    },
    rowTextTitle: {
        fontSize: 20,
        color: '#DF4723',
    },
    rowViewSelect: {
        borderColor: '#DF4723',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 25,
    },
    rowView: {
        width: '100%',
        marginBottom: 25,
    },
    rowText: {
        fontSize: 18,
        marginBottom: 5,
    },
    rowSlider: {
        width: '100%',
    },
    button: {
        height: 46,
        width: 100,
        alignSelf: 'center',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF'
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
})