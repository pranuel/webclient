import * as decode from 'jwt-decode';
// import { browserHistory } from 'react-router-dom';
import * as auth0 from 'auth0-js';


const config = {
    domain: 'pranuel.eu.auth0.com',
    clientID: 'x97CfrtUlj0hVvvm0RU6RKxrEbY35rp2',
    redirectUri: 'http://localhost:8888/callback',
    audience: 'https://iou.de', // <-- audience of the API (not client)
    responseType: 'token id_token',
    scope: 'openid profile read:all'
};

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

var auth = new auth0.WebAuth({
    clientID: config.clientID,
    domain: config.domain
});

export function login() {
    auth.authorize(config);
}

export function logout() {
    clearIdToken();
    clearAccessToken();
    // browserHistory.push('/');
}

export function getIdToken(): IdToken {
    let idTokenString = localStorage.getItem(ID_TOKEN_KEY);
    if (!idTokenString) {
        return null;
    }
    let token = decode<IdToken>(idTokenString);
    return token;
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(token: IdToken) {
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token: IdToken) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}