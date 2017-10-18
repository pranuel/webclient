import * as React from "react";
import { InjectedRouter, withRouter } from "react-router";
import { DataService } from "../services/DataService";
import { getIdToken } from "../services/AuthService";

class CreateUser extends React.Component<{ router: InjectedRouter }, CreateUserState> {

    private dataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                photoUrl: "",
                id: null
            }
        };
    }

    async componentDidMount() {
        let me = await this.dataService.getMe();
        // check if me exists, then redirect to debts summaries:
        if (!!me) {
            this.props.router.push("/debtssummaries");
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
        })
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.dataService.createMe(this.state.user);
        event.preventDefault();
        this.props.router.push("/debtssummaries");
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <img src={this.state.user.photoUrl} />
                <label>
                    Name:
                    <input value={this.state.user.name} onChange={this.handleNameChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}

export const CreateUserWithRouter = withRouter(CreateUser);