import 'semantic-ui-css/semantic.min.css';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { requireAuth } from './services/AuthService';
import { App } from "./routes/App";
import { IntlProvider } from "react-intl";
import { Callback } from "./routes/Callback";
import { DebtsSummariesList } from './routes/DebtsSummariesList';
import { CreateUserWithRouter } from './routes/CreateUser';
import { AddDebt } from './routes/AddDebt';
import { SelectDebtPartner } from './routes/SelectDebtPartner';
import { DebtsSummary } from './routes/DebtsSummary';

ReactDOM.render(
    <IntlProvider locale={navigator.language}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRoute component={CreateUserWithRouter} onEnter={requireAuth} />
                <Route path="/debts-summaries" component={DebtsSummariesList} onEnter={requireAuth} />
                <Route path="/debts-summary/:id" component={DebtsSummary} onEnter={requireAuth} />
                <Route path="/add-debt/:id" component={AddDebt} onEnter={requireAuth} />
                <Route path="/select-debt-partner" component={SelectDebtPartner} onEnter={requireAuth} />
            </Route>
            <Route path="/callback" component={Callback} />
        </Router>
    </IntlProvider>,
    document.getElementById("root")
);