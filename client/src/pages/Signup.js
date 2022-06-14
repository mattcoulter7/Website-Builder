import React from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import Login from '../layouts/Login';

import SignupForm from '../components/Login/SignupForm';

export default () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);

    if (cookies.AuthToken) { // TODO change to check if user is valid
        return <Navigate to='/' />;
    }

    return (
        <Login>
            <SignupForm />
        </Login>
    );
}