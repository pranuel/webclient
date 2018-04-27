import { Component } from 'react';
import { setIdToken, setAccessToken } from '../services/AuthService';
import { History } from 'history';

export class Callback extends Component<{ history: History }, {}> {

    componentDidMount() {
        setAccessToken();
        setIdToken();
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}