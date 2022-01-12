import React, {Component} from 'react';
import {TouchableWithoutFeedback, View, Text, Easing , ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../constant';

//MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

export default class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.ButtonAnimation = React.createRef(null);
    this.Ani = this.Ani.bind(this)
    this.state = {
        isLoading : this.props.Loader
    }
  }

  Ani() {
      this.ButtonAnimation.current.animate('bounceIn' , 700  )
    this.props.onPress()
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>

            {this.state.isLoading ? <View style={{marginVertical : 15}}>
                <ActivityIndicator color={COLORS.YELLOW}  />
            </View>
            :
        <TouchableWithoutFeedback onPress={() => this.Ani()}>
          <Animatable.View
            ref={this.ButtonAnimation}
            style={{
              backgroundColor: COLORS.YELLOW,
              width: 130,
              height: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.MAIN_RED}}> {this.props.name}</Text>
          </Animatable.View>
        </TouchableWithoutFeedback> }
      </View>
    );
  }
}
