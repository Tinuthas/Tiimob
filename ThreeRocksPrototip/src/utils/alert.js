import {Alert} from 'react-native'

const createAlert = (title, message) =>
    Alert.alert(
    title,
    message,
    [
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
);

export {createAlert}