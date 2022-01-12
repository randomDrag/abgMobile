import { combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';

import { persistReducer } from "redux-persist";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import AsyncStorage from '@react-native-async-storage/async-storage' ;


import register from './register';
import Login from './Login';
import isAuth from './isAuth';
import sendSms from './sendSms';
import FirstTimeApp from './FirstTimeApp';
const persistConfig = {
    key: "root",
    storage : AsyncStorage,
    stateReconciler : hardSet,
    blacklist : ['register']

  };


  const rootReducer = combineReducers({

    form : formReducer,
    register,
    Login,
    isAuth,
    sendSms,
    FirstTimeApp
    
  })

  export default persistReducer(persistConfig, rootReducer)