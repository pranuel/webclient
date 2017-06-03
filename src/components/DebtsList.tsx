import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Grid, Container, Card } from "semantic-ui-react";

import { fetchDebts } from "../actions/Actions";
import { DebtsListItem } from "./DebtsListItem";

type DispatchProps = {
    fetchDebts: () => { type: string }
};

type OwnProps = {};

type DebtsListProps = Store.DebtsProps & DispatchProps & OwnProps;

const mapStateToProps = (state: Store.All, ownProps: OwnProps): Store.DebtsProps => ({
    debts: state.debts,
    isFetchingDebts: state.isFetchingDebts
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): DispatchProps => ({
    fetchDebts: () =>
        dispatch(fetchDebts())
});

class DebtsListComponent extends React.Component<DebtsListProps, {}> {

    componentDidMount() {
        this.fetchDebts();
    }

    fetchDebts() {
        this.props.fetchDebts();
    }

    render() {

        const { debts, isFetchingDebts } = this.props;

        return (
            <Card.Group stackable>
                {debts.map(debt => 
                <DebtsListItem debt={debt} key={debt._id}></DebtsListItem>
                )}
            </Card.Group>
        );
    }
}

export const DebtsList: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(DebtsListComponent);