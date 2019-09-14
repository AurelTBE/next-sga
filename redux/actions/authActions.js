import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';

export const authenticate = user => dispatch =>
    axios.post(`http://sga-gymfeminine.fr/bo/wp-json/jwt-auth/v1/token`, user)
    .then(response => {
        dispatch({ type: AUTHENTICATE, payload: response.data });
        setCookie('token', response.data);
        Router.push('/');
    })
    .catch(err => console.log(err));

// gets the token from the cookie and saves it in the store
export const reauthenticate = token => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, payload: token });
    };
};

// removing the token
export const deauthenticate = () => {
    return dispatch => {
        Router.push('/').then(() => {
            removeCookie('token');
            dispatch({ type: DEAUTHENTICATE });
        })
    };
};


// Gestion des cookies
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: '/'
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};
