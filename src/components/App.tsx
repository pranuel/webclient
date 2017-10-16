import * as React from 'react';
import { DataService } from '../services/DataService';

export class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            me: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();
        let me = await ds.getMe();
    }

    render() {

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}