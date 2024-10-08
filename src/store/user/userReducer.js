
import { USER_ACTION_TYPES } from "./userTypes";

const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
        case USER_ACTION_TYPES.TAUW_SIGN_IN_START:
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
        case USER_ACTION_TYPES.SIGN_OUT_START:
            return {...state, isLoading: true };
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { 
                ...state,
                currentUser: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null, isLoading: false };            
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return {
                ...state, error: payload
            }
        default:
            return state;
    }
};