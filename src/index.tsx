import 'semantic-ui-css/semantic.min.css';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { requireAuth } from './services/AuthService';
import { App } from "./routes/App";
import { IntlProvider } from "react-intl";
import { Callback } from "./routes/Callback";
import { DebtsGroupsList } from './routes/DebtsGroupsList';
import { CreateUserWithRouter } from './routes/CreateUser';
import { AddDebt } from './routes/AddDebt';
import { SelectDebtPartner } from './routes/SelectDebtPartner';
import { DebtsGroup } from './routes/DebtsGroup';
import { DebtsList } from './routes/DebtsList';

ReactDOM.render(
    <IntlProvider locale={navigator.language}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRoute component={CreateUserWithRouter} onEnter={requireAuth} />
                <Route path="/debts-list" component={DebtsList} onEnter={requireAuth} />
                <Route path="/debts-groups" component={DebtsGroupsList} onEnter={requireAuth} />
                <Route path="/debts-groups/:id" component={DebtsGroup} onEnter={requireAuth} />
                <Route path="/add-debt" component={AddDebt} onEnter={requireAuth} />
                <Route path="/select-debt-partner" component={SelectDebtPartner} onEnter={requireAuth} />
            </Route>
            <Route path="/callback" component={Callback} />
        </Router>
    </IntlProvider>,
    document.getElementById("root")
);