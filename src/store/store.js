import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger"
import reducer from "./reducer.js"
import createSagaMiddleware from "redux-saga"
import sagas from "./sagas.js"
let sagaMiddeware = createSagaMiddleware()

const store = createStore(reducer,applyMiddleware(logger),applyMiddleware(sagaMiddeware));

sagaMiddeware.run(sagas)
export default store
