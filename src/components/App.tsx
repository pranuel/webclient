import * as React from 'react';
import { DebtsList } from "./DebtsList";

export class App extends React.Component<{}, void> {

    render() {

        return (
            <DebtsList></DebtsList>
        );
    }
}