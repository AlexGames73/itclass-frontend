import { SET_MOBILE, SET_TABLET } from '../reducers'

export const setMobile = flag => ({
    type: SET_MOBILE,
    payload: flag,
})

export const setTablet = flag => ({
    type: SET_TABLET,
    payload: flag
})
