import 'semantic-ui-css/semantic.min.css';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRedirect, browserHistory, IndexRoute } from 'react-router';

import { requireAuth } from './services/AuthService';
import { App } from "./components/App";
import { IntlProvider } from "react-intl";
import { Callback } from "./components/Callback";
import { DebtsSummariesList } from './components/DebtsSummariesList';

ReactDOM.render(
    <IntlProvider locale={navigator.language}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRoute component={DebtsSummariesList} />
            </Route>
            <Route path="/callback" component={Callback} />
        </Router>
    </IntlProvider>,
    document.getElementById("root")
);