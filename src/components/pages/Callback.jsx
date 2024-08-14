import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
    const navigate = useNavigate();

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');


    const getToken = async () => {
        const codeVerifier = window.localStorage.getItem('code_verifier');

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                code_verifier: codeVerifier
            })
        };

        const response = await fetch('https://accounts.spotify.com/api/token', payload);
        const data = await response.json();

        if (data.access_token) {
            window.localStorage.setItem('access_token', data.access_token);
            navigate('/app');
        } else {
            console.error('Failed to obtain access token', data);
        };
    };

    useEffect(() => {
        if (code) getToken(code);
        else console.error('Authorization code not found in URL');
    }, [navigate]);

    return (
        <div>Processing authorization...</div>
    );
};

export default Callback;