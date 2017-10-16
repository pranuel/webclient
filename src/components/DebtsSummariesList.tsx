import { Component } from "react";
import * as React from "react";
import { DataService } from "../services/DataService";
import { DebtsSummariesListItem } from "./DebtsSummariesListItem";

export class DebtsSummariesList extends React.Component<{}, DebtsSummariesListState> {

    constructor(props) {
        super(props);
        this.state = {
            debtsSummariesList: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();
        let debtsSummaries = await ds.getDebtsSummaries();
        this.setState({
            debtsSummariesList: debtsSummaries
        });
    }

    render() {
        const { debtsSummariesList } = this.state;

        return (
            <div>
                {
                    debtsSummariesList &&
                    <ul>
                        {debtsSummariesList.map(debtsSummary => (
                            <DebtsSummariesListItem key={debtsSummary.id} debtsSummary={debtsSummary} />
                        ))}
                    </ul>
                }
            </div>
        );
    }
}