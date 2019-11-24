import { AUTHENTICATE, AUTHERROR, DEAUTHENTICATE } from '../actionTypes';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';

// Connexion
export const authenticate = user => dispatch =>
    axios.post(`https://sga-gymfeminine.fr/bo/wp-json/jwt-auth/v1/token`, user)
    .then(response => {
        dispatch({ type: AUTHENTICATE, payload: response.data });
        setCookie('token', response.data);
        Router.back();
    })
    .catch(err => dispatch({ type: AUTHERROR, payload: err}))

export const resetloggerror = () => {
    return dispatch => {
        dispatch({ type: AUTHERROR, payload: null });
    };
};

// Premiere connexion post signup
export const postsignup = user => dispatch =>
    axios.post(`https://sga-gymfeminine.fr/bo/wp-json/jwt-auth/v1/token`, user)
    .then(response => {
        dispatch({ type: AUTHENTICATE, payload: response.data });
        setCookie('token', response.data);
        Router.push('/');
    })
    .catch(err => console.log(err));

// Récupère le token dans le cookie et le sauvegarde dans le store
export const reauthenticate = token => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, payload: token });
    };
};

// Suppression du token
export const deauthenticate = () => {
    return dispatch => {
        Router.push('/').then(() => {
            removeCookie('token');
            dispatch({ type: DEAUTHENTICATE });
        })
    };
};

// Persistence de la session
export const checkServerSideCookie = ctx => {
    if (ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const rawToken = getCookie('token', ctx.req);
            const token = rawToken ? JSON.parse(decodeURIComponent(rawToken)) : null;
            ctx.store.dispatch(reauthenticate(token));
        }
    } else {
        const token = ctx.store.getState().authentication.token;

        if (token && (ctx.pathname === '/connexion' || ctx.pathname === '/inscription')) {
            setTimeout(function() {
                Router.push('/');
            }, 0);
        }
    }
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
