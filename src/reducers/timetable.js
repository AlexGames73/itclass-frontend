import { IS_DEBUG } from '..'

export const RECIEVE_TABLES = "RECIEVE_TABLES"
export const REQUEST_TABLES = "REQUEST_TABLES"

const TIMETABLE_REQUEST = "/api/timetable"

const timetableReducer = (state = {
    timetable: null,
    weekdays: null,
    weekend: null
}, action) => {
    switch (action.type) {
        case RECIEVE_TABLES:
            return { ...state, ...processTables(action.payload) }
        case REQUEST_TABLES:
            requestTables(action.payload)
            return state
        default:
            return state
    }
}

const processTables = tables => {
    const weekdays = tables.data.weekdays
    const weekend = tables.data.weekend
    const timetable = []
    const maxCount = Math.max(...tables.data.timetable.map(i => i.lessons.length))

    for (let i = 0; i < maxCount; i++) {
        const row = []
        for (let j = 0; j < 6; j++) {
            row.push(tables.data.timetable[j].lessons[i])
        }
        timetable.push(row)
    }

    return {
        timetable,
        weekdays,
        weekend
    }
}

const requestTables = (dispatch) => {
    fetch("https://itclass.pythonanywhere.com" + TIMETABLE_REQUEST)
        .then(res => res.json())
        .then(response => dispatch(response))
}

export default timetableReducer