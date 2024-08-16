const spotifyServices = {
    GETRequest: async (accessToken, url) => {
        const response = await fetch(url, {
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