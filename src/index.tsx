import 'semantic-ui-css/semantic.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { App } from './routes/App';
import { IntlProvider } from 'react-intl';
import { Callback } from './routes/Callback';
import { DebtsGroupsList } from './routes/DebtsGroupsList';
import { CreateUserWithRouter } from './routes/CreateUser';
import { AddDebt } from './routes/AddDebt';
import { SelectDebtPartner } from './routes/SelectDebtPartner';
import { DebtsGroup } from './routes/DebtsGroup';
import { DebtsList } from './routes/DebtsList';
import { PrivateRoute } from './routes/PrivateRoute';

ReactDOM.render(
    <IntlProvider locale={navigator.language}>
        <Router>
            <App>
                <PrivateRoute exact path='/' component={CreateUserWithRouter} />
                <PrivateRoute path='/debts-list' component={DebtsList} />
                <PrivateRoute path='/debts-groups' component={DebtsGroupsList} />
                <PrivateRoute path='/debts-groups/:id' component={DebtsGroup} />
                <PrivateRoute path='/add-debt' component={AddDebt} />
                <PrivateRoute path='/select-debt-partner' component={SelectDebtPartner} />
                <Route path='/callback' component={Callback} />
            </App>
        </Router>
    </IntlProvider>,
    document.getElementById('root')
);