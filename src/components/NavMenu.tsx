import * as React from "React";
import { NavLink } from './NavLink';

require("../../styles/navmenu.css");

export class NavMenu extends React.Component<{}, {}> {

    render() {
        return (
            <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <NavLink to="/home" className='navbar-brand'>Expense Management</NavLink>
                    </div>
                    <div className='clearfix'></div>
                    <div className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav'>
                            <li>
                                <NavLink to="/debts" className='navbar-brand'>
                                    <span className='glyphicon glyphicon-th-list'></span> Debts
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}