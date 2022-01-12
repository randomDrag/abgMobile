import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';

import {IsAuth} from "./src/actions"
import Dashboard from './src/screens/Dashboard';
import SmsListener from 'react-native-android-sms-listener'

import AsyncStorage from '@react-native-async-storage/async-storage'
const Stack = createStackNavigator();


export class Route extends Component {
  // static propTypes = {
  //     prop: PropTypes
  // }
  
  constructor (props){
    super(props)

    this.state = {
      authUser:  false
    }
  
    this.MainView = this.MainView.bind(this);
  }

//   componentWillReceiveProps(nextProps){
// console.log(nextProps)

//   }

// componentDidUpdate(nextProps){
//   console.log("comp ==>", this.props)

  
//   if(nextProps.Auth != this.props.Auth){
//     console.log("comp inside ==>",nextProps)

//   }
// }


  componentDidMount(){
this.props.IsAuth();


// SmsListener.addListener(message => {
//   console.log(message)
// })
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="DashBoard"
            screenOptions={{headerShown: false}}>
            {/* <Stack.Screen
              name="splashScreen"
              component={Splash}
              options={{headerShown: false}}
            />

            <Stack.Screen name="Main"
              component={this.MainView}
              options={{headerShown: false}} /> */}
    

{ this.props.Auth != null ?  (<Stack.Screen name='DashBoard' component={Dashboard} options={{headerShown : false}}/>):
      (<Stack.Screen
          name="Main"
          component={this.MainView}
          options={{headerShown: false}}
          />) }

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

   MainView =() => {

    

   console.log('auth is  ===>',this.props.Auth)
    return (
      <Stack.Navigator initialRouteName='Home' >
          <Stack.Screen
              name="splashScreen"
              component={Splash}
              options={{headerShown: false}}
            />
      <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
          />
        
      </Stack.Navigator>
    );
  };

}



const mapStateToProps = state => ({
  Auth : state.Login.token
});

const mapDispatchToProps = {
  IsAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
