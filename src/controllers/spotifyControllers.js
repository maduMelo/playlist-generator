import spotifyServices from '../services/spotifyServices';

const spotifyControllers = {
    handleProfileRequest: async (accessToken, saveProfileInfo) => {
        const url = 'https://api.spotify.com/v1/me';

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            if (data) saveProfileInfo(data);
        }
        catch (error) { console.error('Failed to request profile information', error) };
    },

    handlePlaylistCreation: async (userID, savePlaylistId, accessToken, playlistConfig) => {
        const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

        try {
            const data = await spotifyServices.POSTRequest(accessToken, url, JSON.stringify(playlistConfig));
            if (data) savePlaylistId(data.id);
        }
        catch (error) { console.error('Failed to create playlist', error) };
    },

    handleTracksAddition: async (accessToken, playlistID, tracksIDs) => {
        const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

        try {
            await spotifyServices.POSTRequest(accessToken, url, JSON.stringify({ uris: tracksIDs }));
        }
        catch (error) { console.error('Failed to add tracks', error) };
    },

    handleTrackRequest: async (accessToken, trackID, saveTrack) => {
        const url = `https://api.spotify.com/v1/tracks/${trackID}`;

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            if (data) saveTrack(data);
        }
        catch (error) { console.error('Failed to get track', error) };
    },

    handleGetFollowedArtists: async (accessToken) => {
        const url = 'https://api.spotify.com/v1/me/following?type=artist';

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            return data.artists.items.slice(4, 7).map(artist => artist.id);
        }
        catch (error) { console.error('Failed to get followed artists', error) };
    },

    handleTopTracksRequest: async (accessToken, artistID, saveTopTracks) => {
        const url = `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=BR`;

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            if (data) saveTopTracks(data);
        }
        catch (error) { console.error('Failed to get top tracks', error) };
    },

    handleRelatedArtistsRequest: async (accessToken, artistID) => {
        const url = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            return data.artists.slice(0, 5).map(artist => artist.id);
        }
        catch (error) { console.error('Failed to get related artists', error) };
    },

    handleRecommendationsRequest: async (accessToken, seedArtists, seedGenres, seedTracks) => {
        const url = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`;

        try {
            const data = await spotifyServices.GETRequest(accessToken, url);
            return data.tracks.filter(track => track.preview_url !== null);
        }
        catch (error) { console.error('Failed to get recommendations', error) };
    },
};


export default spotifyControllers;