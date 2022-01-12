import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import { COLORS, FONT_SIZE } from '../constant';

export default class InputTextABG extends Component {
  render() {
    const {error, touched} = this.props?.meta;

    const isErrorVisible = () => {
      return touched && error ? (
        <Text allowFontScaling={false} style={{color : COLORS.MAIN_RED , ...FONT_SIZE.S}}>
          {error}
        </Text>
      ) : null;
    };

    return (
      <View>
        <View style={{backgroundColor : COLORS.WHITE , width : 250 , borderRadius : 5 ,marginVertical : 10}}>
          <TextInput
          style={{flexGrow : 0 , height : 40 , color : COLORS.BLACK , ...FONT_SIZE.L , paddingHorizontal : 10 ,  borderColor : COLORS.MAIN_RED , borderWidth : 1 , borderRadius : 5}}
            {...this.props}
            placeholder={this.props.placeholder}
            onChangeText={this.props.input.onChange}
            defaultValue={this.props.input.value}
            placeholderTextColor="#AAAAAA"
            onBlur={this.props.input.onBlur}
            onFocus={this.props.input.onFocus}
            secureTextEntry={typeof this.props.password == 'undefined' ? false : true}
          />
        </View>
        {isErrorVisible()}
      </View>
    );
  }
}
