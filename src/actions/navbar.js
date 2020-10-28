import { MENU_LEFT_CHANGE, MENU_RIGHT_CHANGE } from './../reducers'

export const menuLeftChangeActionCreator = (isOpenLeftMenu) => {
    return {
        type: MENU_LEFT_CHANGE,
        payload: isOpenLeftMenu
    }
}

export const menuRightChangeActionCreator = (isOpenRightMenu) => {
    return {
        type: MENU_RIGHT_CHANGE,
        payload: isOpenRightMenu
    }
}