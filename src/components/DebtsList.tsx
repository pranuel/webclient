import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Grid, Container, Card } from "semantic-ui-react";

import { fetchDebtsLists } from "../actions/Actions";
import { DebtsListItem } from "./DebtsListItem";

type DispatchProps = {
    fetchDebtsLists: () => { type: string }
};

type OwnProps = {};

type DebtsListProps = Store.DebtsListsProps & DispatchProps & OwnProps;

const mapStateToProps = (state: Store.All, ownProps: OwnProps): Store.DebtsListsProps => ({
    debtsLists: state.debtsLists,
    isFetchingDebtsLists: state.isFetchingDebtsLists
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): DispatchProps => ({
    fetchDebtsLists: () =>
        dispatch(fetchDebtsLists())
});

class DebtsListComponent extends React.Component<DebtsListProps, {}> {

    componentDidMount() {
        this.fetchDebts();
    }

    fetchDebts() {
        this.props.fetchDebtsLists();
    }

    render() {

        const { debtsLists, isFetchingDebtsLists } = this.props;

        return (
            <Card.Group stackable>
                {debtsLists.map(debtsList =>
                    <DebtsListItem debtsList={debtsList} key={debtsList._id}></DebtsListItem>
                )}
            </Card.Group>
        );
    }
}

export const DebtsList: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(DebtsListComponent);