const spotifyServices = {
    GETRequest: async (accessToken, url, params) => {
        const urlWithParams = new URL(url);
        Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]));

        const response = await fetch(urlWithParams, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },

    POSTRequest: async (accessToken, url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body
        });

        const data = await response.json();
        return data;
    },
};


export default spotifyServices;