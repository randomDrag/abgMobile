//import AsyncStorage from "@react-native-async-storage/async-storage"
import { SEND_SMS } from "../actions/const";

export default(state = {}, action) => {

    switch (action.type) {

        case SEND_SMS:

        return action.payload


        default:
            return state;

    }

}
