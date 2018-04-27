import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, login } from '../services/AuthService';
import * as React from 'react';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : login()
        }
    />
);