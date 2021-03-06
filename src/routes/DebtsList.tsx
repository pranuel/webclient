import { FormattedRelative } from 'react-intl';
import * as React from 'react';
import { DataService } from '../services/DataService';
import { DebtsListItem } from '../components/DebtsListItem';
import { Link } from 'react-router-dom';

interface DebtsListState {
    debts: Debt[];
}

export class DebtsList extends React.Component<RouteProps, DebtsListState> {

    constructor(props) {
        super(props);
        this.state = {
            debts: null
        };
    }

    async componentDidMount() {
        let ds = new DataService();

        let debts = await ds.getDebts();
        this.setState({ debts: debts });

        let me = await ds.getMe();
    }

    render() {
        const { debts } = this.state;

        return (
            <div>
                {!!debts &&
                    <div className='ui feed'>
                        {debts.map(debt => (
                            <DebtsListItem key={debt.id} debt={debt} />
                        ))}
                    </div>
                }
                <Link to={'/add-debt'}>Add Debt</Link>
            </div>
        );
    }
}