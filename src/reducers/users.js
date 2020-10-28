import { IS_DEBUG } from '..'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECIEVE_USERS = 'RECIEVE_USERS'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_SIZE = 'CHANGE_SIZE'

const USERS_REQUEST = "/api/get-users"

const usersReducer = (state = {
    users: null,
    curPage: 1,
    countUsersOnPage: 5,
}, action) => {
    switch (action.type) {
        case RECIEVE_USERS:
            return { ...state, ...recieveUsers(action.payload) }
        case REQUEST_USERS:
            requestUsers(action.payload)
            return state
        case CHANGE_PAGE:
            return { ...state, curPage: action.payload }
        case CHANGE_SIZE:
            return { ...state, curPage: 1, countUsersOnPage: action.payload }
        default:
            return state
    }
}

const recieveUsers = (users) => {
    const curPage = 1
    return {
        users,
        curPage
    }
}

const requestUsers = (dispatch) => {
    fetch("https://itclass.pythonanywhere.com" + USERS_REQUEST)
        .then(res => res.json())
        .then(users => {
            let buf = {"admin": 0, "user": 1}
            users.sort((a, b) => (buf[a.role] - buf[b.role]))
            dispatch(users)
        })
}

export default usersReducer