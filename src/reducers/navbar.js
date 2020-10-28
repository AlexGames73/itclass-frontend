import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import GradeIcon from '@material-ui/icons/Grade'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LockIcon from '@material-ui/icons/Lock'

export const MENU_LEFT_CHANGE = "MENU_LEFT_CHANGE"
export const MENU_RIGHT_CHANGE = "MENU_RIGHT_CHANGE"

const navbarReducer = (state = {
    openLeftMenu: false,
    openRightMenu: false,
    linksMenuLeft: [
        ["Главная", HomeIcon, "/"],
        ["Пользователи", PeopleIcon, "/users"],
        ["Имиджборд", GradeIcon, "/threads"],
        ["Расписание", ViewWeekIcon, "/timetable"],
    ],
    linksMenuRightUnauth: [
        ["Вход", ChevronRightIcon, "/signin"],
        ["Регистрация", LockIcon, "/signup"],
    ],
    linksMenuRightAuth: [
        ["Профиль", HomeIcon, "/"],
        ["Редактировать", PeopleIcon, "/users"],
        ["Оформление", GradeIcon, "/trends"],
        ["Выйти", ChevronLeftIcon, "/logout"]
    ]
}, action) => {
    switch (action.type) {
        case MENU_LEFT_CHANGE:
            return { ...state, openLeftMenu: action.payload }
        case MENU_RIGHT_CHANGE:
            return { ...state, openRightMenu: action.payload }
        default:
            return state
    }
}

export default navbarReducer;