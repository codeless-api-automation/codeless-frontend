import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as common from "constants/Common";

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem(common.ACCESS_TOKEN) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/sign-in",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
export default ProtectedRoute;