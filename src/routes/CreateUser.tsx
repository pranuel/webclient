import * as React from 'react';
import { withRouter } from 'react-router';
import { DataService } from '../services/DataService';
import { getIdToken } from '../services/AuthService';
import { History } from 'history';

// tslint:disable-next-line:no-any
class CreateUser extends React.Component<{ history: History }, CreateUserState> {

    private dataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                photoUrl: '',
                id: null
            }
        };
    }

    async componentDidMount() {
        let me = await this.dataService.getMe();
        // check if me exists, then redirect to debts groups:
        if (!!me) {
            this.props.history.push('/debts-list');
        } else {
            let idToken = getIdToken();
            this.setState({
                user: {
                    id: null,
                    photoUrl: idToken.picture,
                    name: idToken.name
                }
            });
        }
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value;
        this.setState({
            user: { ...this.state.user, ...{ name: name } }
        });
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await this.dataService.createMe(this.state.user);
        this.props.history.push('/debts-list');
    }

    render() {

        const { user } = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <img src={user.photoUrl} />
                <label>
                    Name:
                    <input value={user.name} onChange={this.handleNameChange.bind(this)} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        );
    }

}

export const CreateUserWithRouter = withRouter(CreateUser);