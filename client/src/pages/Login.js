import React from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import Login from '../layouts/Login';

import LoginForm from '../components/Login/LoginForm';

export default () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);

    if (cookies.AuthToken) { // TODO change to check if user is valid
        return <Navigate to='/' />;
    }

    return (
        <Login>
            <LoginForm />
        </Login>
    );
}