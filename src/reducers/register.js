import { REGISTER } from "../actions/const";

export default(state = {}, action) => {

    switch (action.type) {

        case REGISTER:
            return action.payload


        default:
            return state;

    }

}
