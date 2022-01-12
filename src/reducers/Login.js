import AsyncStorage from "@react-native-async-storage/async-storage"
import { IS_LOGOUT, LOGIN_USER } from "../actions/const";

export default(state = {token : null}, action) => {

    switch (action.type) {

        case LOGIN_USER:

       

            return { token : action.payload.token}


            case IS_LOGOUT :

            return { token : null }


        default:
            return state;

    }

}
