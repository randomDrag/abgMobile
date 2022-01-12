import AsyncStorage from "@react-native-async-storage/async-storage"
import { FIRST_TIME_APP, LOGIN_USER } from "../actions/const";

export default(state = {}, action) => {

    switch (action.type) {

        case FIRST_TIME_APP:

       

            return action.payload


        default:
            return state;

    }

}
