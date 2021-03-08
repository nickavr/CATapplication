import React from 'react';
import { Redirect, Route } from 'react-router-dom';
let userService = require('./Services/UserService');

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (userService.userIsLogged()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        ></Route>
    );
};

export default ProtectedRoute;
