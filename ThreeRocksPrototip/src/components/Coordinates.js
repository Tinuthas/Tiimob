import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements'



export default class Coords extends Component {
	state = {
        location: null,
        checked: false,
    };

    constructor(props){
        super(props);
    }

    

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = position;
                const checked = true
                this.setState({ location, checked });
                this.props.onChange(location)
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
    };
    
    onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }

	render() {


		return (
			<View style={styles.container}>
                <CheckBox
                containerStyle={styles.checkbox}
                title='Configurar localização e permissão'
                checkedColor='#DF4723'
                checked={this.state.checked}
                onPress={this.findCoordinates}
            />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        marginVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'center',
        
	},
    checkbox: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        //backgroundColor: '#f5f5f5',
        //backgroundColor: '#333333',
        height: 46
    }
})