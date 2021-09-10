import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image
    } from 'react-native';
import ViewSlider from 'react-native-view-slider'
const { width, height } = Dimensions.get('window');

export default function FormParameters({ navigation}) {


  return ( 
    <View style='container'>
    <ViewSlider 
        renderSlides = {
          <>
            <View style={styles.viewBox}>
              <Image source={{uri: 'https://image.shutterstock.com/image-photo/beautiful-autumn-scene-hintersee-lake-260nw-747646759.jpg'}} style={{height: 200, width: width}}/>
            </View>
            <View style={styles.viewBox}><Text>TWO</Text></View>
            <View style={styles.viewBox}><Text>THREE</Text></View>
            <View style={styles.viewBox}><Text>FOUR</Text></View>
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {200}    //Height of your slider
      slideCount = {4}    //How many views you are adding to slide
      dots = {true}     // Pagination dots visibility true for visibile 
      dotActiveColor = 'red'     //Pagination dot active color
      dotInactiveColor = 'gray'    // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      //autoSlide = {true}    //The views will slide automatically
      //slideInterval = {1000}    //In Miliseconds
     />
     </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
    viewBox: {
      flex: 1,
      width: width,
      height: '100%',
      backgroundColor: '#f5f5f5',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 30,
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    dotContainer: {
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 15
    }
  });