import { IS_DEBUG } from '..'
const USER_REQUEST = "/api/get-user"

export const REQUEST_USER = 'REQUEST_USER'
export const RECIEVE_USER = 'RECIEVE_USER'
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const CHANGE_ERROR = 'CHANGE_ERROR'

const userReducer = (state = {
    userData: null,
    errorRecieve: false,
}, action) => {
    switch (action.type) {
        case REQUEST_USER:
            requestUserData(action.payload)
            return state
        case RECIEVE_USER:
            return { ...state, userData: action.payload }
        case CLEAR_USER_DATA:
            return { ...state, userData: null, errorRecieve: false }
        case CHANGE_ERROR:
            return { ...state, errorRecieve: action.payload }
        default:
            return state
    }
}

function requestUserData(payload) {
    fetch("https://itclass.pythonanywhere.com" + USER_REQUEST + "?" + 
        (payload.userId ? "id=" + payload.userId : (
            payload.userShort ? "short=" + payload.userShort : ""
        )))
        .then(res => res.json())
        .then(user => payload.dispatch.dispatchMain(user))
        .catch(() => payload.dispatch.dispatchError(true))
}

export default userReducer