import { RECIEVE_USER, REQUEST_USER, CLEAR_USER_DATA, CHANGE_ERROR } from '../reducers'

export const requestUser = (userId, userShort, dispatchMain, dispatchError) => {
    return {
        type: REQUEST_USER,
        payload: {
            userId,
            userShort,
            dispatch: {
                dispatchMain,
                dispatchError,
            }
        }
    }
}

export const recieveUser = (user) => {
    return {
        type: RECIEVE_USER,
        payload: user
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    }
}

export const changeError = (flag) => {
    return {
        type: CHANGE_ERROR,
        payload: flag,
    }
}