import React from 'react';
import { Redirect } from "react-router-dom"

export const withRedirectAtSuccessfulHttpCall = (Component) => {

    class RedirectCoponent extends React.Component {

        render() {
            const { redirectTo, httpCallResult } = this.props;
            if (redirectTo && httpCallResult.isCallSuccessful) {
                return <Redirect to={this.props.redirectTo} />;
            }
            return <Component {...this.props} />
        }
    }
    return RedirectCoponent;
}