import { REQUEST_USERS, RECIEVE_USERS, CHANGE_PAGE, CHANGE_SIZE } from '../reducers'

export const requestUsers = (dispatch) => {
    return {
        type: REQUEST_USERS,
        payload: dispatch
    }
}

export const recieveUsers = (users) => {
    return {
        type: RECIEVE_USERS,
        payload: users
    }
}

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export const changeSize = (size) => {
    return {
        type: CHANGE_SIZE,
        payload: size
    }
}