import * as React from 'react';

export class App extends React.Component<{}, void> {

    render() {

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}