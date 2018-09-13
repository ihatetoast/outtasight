import { createStore, applyMiddleware, compose } from 'redux';
//compose is for the redux dev tools
import thunk from 'redux-thunk';
//bring in root reducer

import rootReducer from './reducers';
const middleware = [thunk];
const initialState = {};
//compose and window. ... is for dev tools
//empty store: const store = createStore(()=>[rootReducer],{initialState}, applyMiddleware())
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

/*
from redux dox: 
Don't create more than one store in an application! Instead, use combineReducers to create a single root reducer out of many.

compose and window.__REDUX is for the devtools so i can see my store. 
copy pasted from https://github.com/zalmoxisus/redux-devtools-extension#usage
*/
