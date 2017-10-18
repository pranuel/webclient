import * as React from 'react';

export class App extends React.Component<{}, AppState> {

    render() {

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
