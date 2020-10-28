export const SET_MOBILE = 'SET_MOBILE'
export const SET_TABLET = 'SET_TABLET'

const appReducer = (state = {
    user: {
        isAuth: false,
        data: null,
    },
    isMobile: false,
    isTablet: false,
}, action) => {
    switch (action.type) {
        case SET_MOBILE:
            return { ...state, isMobile: action.payload }
        case SET_TABLET:
            return { ...state, isTablet: action.payload }
        default:
            return state;
    }
}

export default appReducer;