import 'semantic-ui-css/semantic.min.css';

import "rxjs";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRedirect, browserHistory } from 'react-router';
import { compose, Store as ReduxStore, combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { requireAuth } from './services/AuthService';
import { rootReducer } from './reducers';
import { rootEpic } from "./epics";
import { App } from "./components/App";
import { DebtsList } from "./components/DebtsList";
import { IntlProvider } from "react-intl";
import { Callback } from "./components/Callback";


// register redux dev tools extension at redux:
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(rootEpic);

// finally create the redux store which will be used throughout the app:
const store = createStore(rootReducer, {},
    composeEnhancers(
        applyMiddleware(epicMiddleware)
    )
);

ReactDOM.render(
    <IntlProvider locale={navigator.language}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/debtsLists" component={DebtsList} onEnter={requireAuth} />
                    <Route path="/callback" component={Callback} />
                </Route>
            </Router>
        </Provider>
    </IntlProvider>,
    document.getElementById("root")
);