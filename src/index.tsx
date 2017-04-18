import "rxjs";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from 'react-router';
import { compose, Store as ReduxStore, combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { rootReducer } from './reducers';
import { rootEpic } from "./epics";
import { Debts } from "./components/Debts";
import { App } from "./components/App";


// register redux dev tools extension at redux:
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(rootEpic);

// finally create the redux store which will be used throughout the app:
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware)
    )
);

// log current store when its state changes:
store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/debts" component={Debts} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);