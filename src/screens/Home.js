import React, {Component} from 'react';
import {
  Text,
  View,
  BackHandler,
  TouchableWithoutFeedback,
  TextInputComponent,
  Alert,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import InputTextABG from '../component/InputTextABG';
import {COLORS, FONT_SIZE, SCREEN} from '../constant';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../component/CustomButton';
import {register , LoginUser , IsAuth} from '../actions';
import validator from 'validator';
import Modal from 'react-native-modal';
import AsyncStorage from "@react-native-async-storage/async-storage"


class Home extends Component {
  constructor(props) {
    super(props);

    this.RegisterAni = React.createRef();
    this.RegisterPage = this.RegisterPage.bind(this);
    this.state = {
      RegisterModel: false,
      LoginLoading: false,
      isLoading: false,
    };
  }

 async componentDidMount() {
    request(PERMISSIONS.ANDROID.READ_SMS).then(v => {
      console.log(v);
    });
    request(PERMISSIONS.ANDROID.RECEIVE_SMS).then(d => {

      console.log(d);
    })

    check (PERMISSIONS.ANDROID.RECEIVE_SMS).then(result => {

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.RECEIVE_SMS).then(v => {
            console.log(v);
          });
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          request(PERMISSIONS.ANDROID.RECEIVE_SMS).then(v => {
            console.log(v);
          });
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          request(PERMISSIONS.ANDROID.RECEIVE_SMS).then(v => {
            console.log(v);
          });
          break;
      }

    })

    check(PERMISSIONS.ANDROID.READ_SMS).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.READ_SMS).then(v => {
            console.log(v);
          });
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          request(PERMISSIONS.ANDROID.READ_SMS).then(v => {
            console.log(v);
          });
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          request(PERMISSIONS.ANDROID.READ_SMS).then(v => {
            console.log(v);
          });
          break;
      }
    });

    // var filter = {
    //   box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    //   /**
    //    *  the next 3 filters can work together, they are AND-ed
    //    *
    //    *  minDate, maxDate filters work like this:
    //    *    - If and only if you set a maxDate, it's like executing this SQL query:
    //    *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
    //    *    - Same for minDate but with "date >= minDate"
    //    */
    // };

    // SmsAndroid.list(
    //   JSON.stringify(filter),
    //   fail => {
    //     console.log('Failed with this error: ' + fail);
    //   },
    //   (count, smsList) => {
    //     console.log('Count: ', count);
    //     console.log('List: ', smsList);
    //     var arr = JSON.parse(smsList);

    //     arr.forEach(function (object) {
    //       console.log('Object: ' + object);
    //       console.log('-->' + object.date);
    //       console.log('-->' + object.body);
    //     });
    //   },
    // );

   


    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  RegisterPage() {
    this.RegisterAni.current.animate('bounceIn', 1000);
    this.setState({
      RegisterModel: true,
    });
  }

  RegisterPageSubmit = values => {
    this.setState({
      isLoading: true,
    });
    const data = {
      Email: values.EMAIL,
      Name: values.NAME,
      Number: values.NUMBER,
    };
    this.props.register(data, e => {
      this.setState({
        isLoading: false,
      });

      if (typeof e == 'undefined') {
        Alert.alert('register successful', 'your application is submitted', [
          {
            text: 'OK',
            onPress: () => this.setState({RegisterModel: false}),
          },
        ]);
      } else {
        console.log(e.message);
        Alert.alert('Error', `${e.message}`);
      }
    });
  };

  LoginUserHandler = async values => {

    this.setState({
      LoginLoading : true,

    });

    const data = {
      Email: values.email,
      Password: values.password,
     // Number: values.NUMBER,
    };


    this.props.LoginUser(data, async (e) => {

      if(typeof e == 'undefined'){

      const token =  await AsyncStorage.setItem('Token' , this.props.token)

      console.log(token);

      }else{
        console.log(e.message);
        Alert.alert('Error', `${e.message}`);
      }


    })



  };

  RegisterModal = () => {
    // console.log(this.props)
    return (
      <Modal
        animationIn={'fadeIn'}
        onBackButtonPress={() => this.setState({RegisterModel: false})}
        onBackdropPress={() =>
          this.setState({
            RegisterModel: false,
          })
        }
        isVisible={this.state.RegisterModel}
        style={{paddingVertical: 20, height: 300, borderRadius: 15}}>
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            paddingVertical: 15,
            borderRadius: 15,
          }}>
          <Text style={{color: COLORS.MAIN_RED}}>REGISTER</Text>
          <Field name="NAME" placeholder="FULL NAME" component={InputTextABG} />
          <Field name="EMAIL" placeholder="EMAIL" component={InputTextABG} />
          <Field
            name="NUMBER"
            placeholder="MOBILE NUMBER"
            component={InputTextABG}
          />
          <CustomButton
            onPress={this.props.handleSubmit(this.RegisterPageSubmit)}
            name={'REGISTER'}
            Loader={this.state.isLoading}
          />
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: COLORS.MAIN_RED,
        }}>
        {this.RegisterModal()}
        <View>
          <Text
            style={{
              color: COLORS.WHITE,
              ...FONT_SIZE.L,
              textAlignVertical: 'center',
              textAlign: 'center',
            }}>
            LOGIN
          </Text>
          <Field
            name={'email'}
            placeholder={'Email'}
            component={InputTextABG}
          />
          <Field
            name="password"
            placeholder={'Password'}
            password={true}
            component={InputTextABG}
          />
          <CustomButton
            name="Login"
            onPress={this.props.handleSubmit(this.LoginUserHandler)}
            Loader={this.state.LoginLoading}
          />

          <TouchableWithoutFeedback
            onPress={() => this.RegisterPage()}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Animatable.Text
              ref={this.RegisterAni}
              style={{
                color: COLORS.YELLOW,
                fontWeight: '500',
                textDecorationLine: 'underline',
                ...FONT_SIZE.L,
                textAlign: 'center',
              }}>
              REGISTER
            </Animatable.Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const validate = values => {
  let errors = {};

  if (!values.NUMBER) {
    errors.NUMBER = 'Required';
  } else if (!validator.isMobilePhone(values.NUMBER, 'en-IN')) {
    errors.NUMBER = 'Invalid Mobile number';
  }

  if (!values.EMAIL) {
    errors.EMAIL = 'Required';
  } else if (!validator.isEmail(values.EMAIL)) {
    errors.EMAIL = 'Invalid Email ';
  }

  if (!values.NAME) {
    errors.NAME = 'Required';
  }

  // if(!values.otp){
  //   errors.otp = 'Required';

  // }else if (values.otp != /^[0-9]{4}$/){
  //   errors.otp = 'Required'
  // }

  return errors;
};

const mapStateToProps = state => (
  {
    token : state.Login.token
  }
)

export default reduxForm({form: 'Login', validate: validate})(
  connect(mapStateToProps, {register , LoginUser , IsAuth})(Home),
);
