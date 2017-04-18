import { Link } from 'react-router';
import * as React from "react";

interface OwnProps {
    to: string;
    className?: string;
}

export class NavLink extends React.Component<OwnProps, {}>{
    render() {
        return <Link {...this.props} activeClassName="active link-active" />
    }
}