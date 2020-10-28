import { createStore, compose, applyMiddleware } from 'redux'
import allReducers from './reducers'
import { createLogger } from 'redux-logger'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    allReducers,
    composeEnhancer(applyMiddleware(createLogger()))
)