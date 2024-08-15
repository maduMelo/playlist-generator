import { getToken } from '../services/authService.js';

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};


const authControllers = {
    handleAuthorizationRequest: async () => {
        const codeVerifier = generateRandomString(64);
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

        const scope = 'user-read-private user-read-email playlist-modify-public';
        const authUrl = new URL('https://accounts.spotify.com/authorize');

        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: CLIENT_ID,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: REDIRECT_URI
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    },

    handleAuthorizationCallback: async (code, navigate) => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

        const codeVerifier = window.localStorage.getItem('code_verifier');

        try {
            const data = await getToken(CLIENT_ID, code, REDIRECT_URI, codeVerifier);

            if (data.access_token) {
                window.localStorage.setItem('access_token', data.access_token);
                navigate('/profile');
            } else {
                console.error('Failed to obtain access token', data);
            };
            
        } catch (error) {
            console.error('Error during authorization callback', error);
        };
    }
};

export default authControllers;