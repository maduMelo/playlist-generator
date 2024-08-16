const spotifyServices = {
    getProfile: async (accessToken) => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    
        const data = await response.json();
        return data;
    },

    createPlaylist: async (userID, accessToken, playlistConfig) => {
        const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistConfig)
        });

        const data = await response.json();
        return data;
    },

    addTracks: async (accessToken, playlistID, tracksIDs) => {
        const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: tracksIDs })
        });

        const data = await response.json();
        return data;
    },

    getTrack: async (accessToken, trackID) => {
        const url = `https://api.spotify.com/v1/tracks/${trackID}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },

    getFollowedArtists: async (accessToken) => {
        const url = 'https://api.spotify.com/v1/me/following?type=artist';

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },

    getArtistTopTracks: async (accessToken, artistID) => {
        const url = `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=BR`;
        
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },

    getRelatedArtists: async (accessToken, artistID) => {
        const url = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },

    getRecommendations: async (accessToken, seedArtists, seedGenres, seedTracks) => {
        const url = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    },
};


export default spotifyServices;