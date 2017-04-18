require("../../styles/expenses.css");

import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { fetchUsers } from "../actions/Actions";
import { Link } from "react-router";
import { mapStateToDebtsProps } from "../mappers/StateMapper";

type DispatchProps = {
    fetchExpenses: () => { type: string };
};

type OwnProps = {
    label: string
}

type DebtsProps = Store.DebtProps & DispatchProps & OwnProps;

const mapStateToProps = (state: Store.All, ownProps: OwnProps): Store.DebtProps => (mapStateToDebtsProps(state));

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): DispatchProps => ({
    fetchExpenses: () =>
        dispatch(fetchUsers())
});

class DebtsComponent extends React.Component<DebtsProps, {}> {

    componentDidMount() {
        this.props.fetchExpenses();
    }

    render() {
        const { debts, isFetchingDebts, label } = this.props;

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Debts Overview</div>
                {debts && debts.length > 0 &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>For what</th>
                            </tr>
                        </thead>
                        <tbody>
                            {debts.map(debt =>
                                <tr key={debt.id}>
                                    <td>{debt.amount}</td>
                                    <td>{debt.reason}</td>
                                </tr>
                            )}
                        </tbody>
                    </table >
                }
            </div >
        );
    }
}

export const Debts: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(DebtsComponent);