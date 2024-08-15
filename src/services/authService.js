async function getToken(client_id, code, redirect_uri, code_verifier) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
            code_verifier
        })
    };

    const response = await fetch('https://accounts.spotify.com/api/token', payload);
    const data = await response.json();

    return data;
};

export { getToken };