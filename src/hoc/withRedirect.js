import React from 'react';
import { Redirect } from "react-router-dom"

export const withRedirect = (Component) => {

    class RedirectCoponent extends React.Component {
        render() {
            const { redirectTo } = this.props;
            if (redirectTo) {
                return <Redirect to={redirectTo} />;
            }
            return <Component {...this.props} />
        }
    }
    return RedirectCoponent;
}