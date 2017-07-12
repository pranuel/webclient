import * as React from 'react';
import * as auth from "../services/AuthService";

export class App extends React.Component<{}, void> {

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }

    render() {

        return (
            <div>
                <button onClick={this.login}>Login</button>
                <button onClick={this.logout}>Logout</button>
                {this.props.children}
            </div>
        );
    }
}