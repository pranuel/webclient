import * as React from 'react';
import { DataService } from '../services/DataService';
import { Link } from 'react-router-dom';

export class SelectDebtPartner extends React.Component<{}, SelectDebtPartnerState> {

    private dataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            nameQuery: '',
            partner: null
        };
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let partner = await this.dataService.getUserByName(this.state.nameQuery);
        this.setState({ partner: partner });
    }

    handleNameQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        let nameQuery = event.target.value;
        this.setState({ nameQuery: nameQuery });
    }

    render() {
        const { nameQuery, partner } = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Find your partner by his name:
                    <input value={nameQuery} autoFocus={true} onChange={this.handleNameQueryChange.bind(this)} />
                </label>
                {!!partner &&
                    <div>
                        <label>
                            Found partner:
                            <p>{partner.name}</p>
                        </label>
                        <Link to={`/add-debt/${partner.id}`}>Add Debts List</Link>
                    </div>
                }
                <input type='submit' value='Search Partner' />
            </form>
        );
    }

}