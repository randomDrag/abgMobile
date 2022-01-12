import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Route from '../../Route'
import { IMAGES, SCREEN } from '../constant'

export default class Splash extends Component {

    componentDidMount(){

        setTimeout(()=>{
            this.props.navigation.navigate('Main')
        },3000)
    }

    render() {
        return (
            <View style={{flex: 1 , backgroundColor : '#AC1C23', justifyContent : 'center' , alignItems : 'center'}}>
             <FastImage style={{ minHeight:100, width : SCREEN.WIDTH/2}} source={IMAGES.LOGO} resizeMode={FastImage.resizeMode.contain} />
            </View>
        )
    }
}
