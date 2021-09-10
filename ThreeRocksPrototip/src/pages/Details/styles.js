import {StyleSheet, Dimensions} from 'react-native'
import Constants from 'expo-constants'
const { width, height } = Dimensions.get('window');


export default StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#e5e5e5',
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
        marginTop: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    viewImages: {

    },
    containerSlider: {
    },

    slider: {
        backgroundColor: '#FFF',
    },

    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5
      },
      containerImageShow: {
          justifyContent: 'center',
          alignItems: 'center',
      },
    avatar: {
        flex: 1,
        width: width,
        height: '100%',
        backgroundColor: '#DDD'
    },
    viewInfo: {
        marginTop: 20,
    },
    viewContainsColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    viewInputText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginHorizontal: 15,
        alignItems: 'baseline'
    },
    viewInputTextColumns: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginHorizontal: 15,
        alignItems: 'baseline'
    },
    textDescription: {
        fontSize: 16,
        color: '#3E3E3E',
        fontWeight: 'bold'
    },
    textResult: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#3E3E3E'
    },
    containerContact:{
        marginTop: 20, 
        marginHorizontal: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    textContact: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    contactButton:{
        flexDirection: 'row',
        width: 150,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        height: 50,
        alignItems: 'center',
    },
    textIconContact: {
        marginHorizontal: 15,
        fontSize: 16,
    },
    contactButtonMessage: {
        flexDirection: 'row',
        width: 150,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        height: 50,
        alignItems: 'center',
    }
})