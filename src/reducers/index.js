import { combineReducers } from 'redux'
import navbarReducer from './navbar'
import appReducer from './app'
import timetableReducer from './timetable'
import usersReducer from './users'
import userReducer from './user';

export * from './navbar'
export * from './timetable'
export * from './users'
export * from './user'
export * from './app'

const allReducers = combineReducers({
    navbar: navbarReducer,
    app: appReducer,
    timetable: timetableReducer,
    users: usersReducer,
    user: userReducer,
})

export default allReducers;
