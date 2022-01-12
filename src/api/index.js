import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
 export const api = axios.create({

   baseURL : "https://abgtower.herokuapp.com/" ,
  // baseURL : 'https://9ec6-122-160-47-222.ngrok.io/' ,
    responseType : 'json',
   
})



  // Set the AUTH token for any request
   api.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('Token');
     config.headers.Authorization =  token ? `Bearer ${token}` : '';
   // config.headers.Authorization =  token ? `Bearer YRMchjD8THyNPthDNpVyXbJmLkSr4FKaDjyOYnar` : '';
  //    config.headers.Authorization =  `Bearer 28|vUbWYePzWghrN4wqKwgwi1q62sXp2JVLvS81J7nb`;
    return config;
  });