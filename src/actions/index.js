import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../api';
import {IS_AUTH, LOGIN_USER, REGISTER, SEND_SMS} from './const';

export const register = (data, cb) => async dispatch => {
  try {
    const response = await api.post('/user/register', data);

    dispatch({
      type: REGISTER,
      payload: response.data,
    });

    cb();
  } catch (e) {
    console.log(e.code);
    cb(e);
  }
};

export const LoginUser = (data, cb) => async dispatch => {
  try {
    const response = await api.post('/user/login', data);

    if (response.status == 200) {
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });

      cb();
    }
  } catch (e) {
    console.log(e.code);
    cb(e);
  }
};

export const IsAuth = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('Token');
    console.log(token);
    dispatch({
      type: IS_AUTH,
      payload: {token: token},
    });
  } catch (e) {
    console.log(e);
  }
};

export const sendMsg = (data, cb) => async dispatch => {
  try {
    const response = await api.post('user/newMassage', data);

    if (response.status == 200) {
      dispatch({
        type: SEND_SMS,
        payload: response.data,
      });
      cb();
    }
  } catch (e) {
    console.log(e.code);
  }
};

export const FirstLaunchApp = val => async dispatch => {
  dispatch({
    type : FIRST_TIME_APP,
    payload : {value : val}
  });
};
