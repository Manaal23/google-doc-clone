import React, { useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function PrivateGuard({...props}) {
    const location = useLocation();
    
    let dontShowAfterLogin = [
        '/',
        '/login'
    ]
    
    let token = localStorage.getItem('token');

        if (token && dontShowAfterLogin.includes(location.pathname)){
            return <Redirect to={`/documents/home`} />
        }else if (!token && !dontShowAfterLogin.includes(location.pathname)){
            return <Redirect to={'/login'} />
        }else {
            return <Route {...props}/>
        }
}

export default PrivateGuard