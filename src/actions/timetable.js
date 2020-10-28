import { RECIEVE_TABLES, REQUEST_TABLES } from '../reducers'

export const recieveTables = (tables) => {
    return {
        type: RECIEVE_TABLES,
        payload: tables
    }
}

export const requestTables = (dispatch) => {
    return {
        type: REQUEST_TABLES,
        payload: dispatch
    }
}