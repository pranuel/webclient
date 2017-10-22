import { Component } from "react";
import * as React from "react";
import { DataService } from "../services/DataService";
import { Link } from "react-router";
import { DebtsSummariesListItem } from "../components/DebtsSummariesListItem";

export class DebtsSummariesList extends React.Component<{}, DebtsSummariesListState> {

    constructor(props) {
        super(props);
        this.state = {
            debtsSummariesList: null,
            me: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();
        let debtsSummaries = await ds.getDebtsSummaries();
        this.setState({ debtsSummariesList: debtsSummaries });

        let me = await ds.getMe();
        this.setState({ me: me });
    }

    render() {
        const { debtsSummariesList, me } = this.state;

        return (
            <div>
                {me &&
                    <div>
                        <img src={me.photoUrl} />
                        <h1>{me.name}</h1>
                    </div>
                }
                {
                    debtsSummariesList &&
                    <ul>
                        {debtsSummariesList.map(debtsSummary => (
                            <DebtsSummariesListItem key={debtsSummary.id} debtsSummary={debtsSummary} />
                        ))}
                    </ul>
                }
                <Link to="/select-debt-partner">Add Debts List</Link>
            </div>
        );
    }
}