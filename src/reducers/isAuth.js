import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_AUTH, IS_LOGOUT} from '../actions/const';

export default (state = {token : null}, action) => {
  switch (action.type) {
    case IS_AUTH:
       if( action.payload.token != null) {
        return {token : action.payload.token};
       }else{
           return {token : null  }
       }
    

    case IS_LOGOUT:
      return {token : null};

    default:
      return state;
  }
};
