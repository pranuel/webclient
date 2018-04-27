import { Component } from 'react';
import * as React from 'react';
import { DataService } from '../services/DataService';
import { Link } from 'react-router';
import { DebtsGroupsListItem } from '../components/DebtsGroupsListItem';

export class DebtsGroupsList extends React.Component<{}, DebtsGroupsListState> {

    constructor(props) {
        super(props);
        this.state = {
            debtsGroupsList: null,
            me: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();
        let debtsGroups = await ds.getDebtsGroups();
        this.setState({ debtsGroupsList: debtsGroups });

        let me = await ds.getMe();
        this.setState({ me: me });
    }

    render() {
        const { debtsGroupsList, me } = this.state;

        return (
            <div>
                {!!me &&
                    <div>
                        <img src={me.photoUrl} />
                        <h1>{me.name}</h1>
                    </div>
                }
                {!!debtsGroupsList &&
                    <ul>
                        {debtsGroupsList.map(debtsGroup => (
                            <DebtsGroupsListItem key={debtsGroup.id} debtsGroup={debtsGroup} />
                        ))}
                    </ul>
                }
                <Link to='/select-debt-partner'>Add Debts List</Link>
            </div>
        );
    }
}