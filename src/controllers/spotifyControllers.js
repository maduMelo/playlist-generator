import spotifyServices from '../services/spotifyServices';

const spotifyControllers = {
    handleProfileRequest: async (accessToken, saveProfileInfo) => {
        try {
            const data = await spotifyServices.getProfile(accessToken);
            if (data) saveProfileInfo(data);
        }
        catch (error) { console.error('Failed to request profile information', error) };
    },

    handlePlaylistCreation: async (userID, savePlaylistId, accessToken, playlistConfig) => {
        try {
            const data = await spotifyServices.createPlaylist(userID, accessToken, playlistConfig);
            if (data) savePlaylistId(data.id);
        }
        catch (error) { console.error('Failed to create playlist', error) };
    },

    handleTracksAddition: async (accessToken, playlistID, tracksIDs) => {
        try {
            await spotifyServices.addTracks(accessToken, playlistID, tracksIDs);
        }
        catch (error) { console.error('Failed to add tracks', error) };
    },

    handleTrackRequest: async (accessToken, trackID, saveTrack) => {
        try {
            const data = await spotifyServices.getTrack(accessToken, trackID);
            if (data) saveTrack(data);
        }
        catch (error) { console.error('Failed to get track', error) };
    },

    handleGetFollowedArtists: async (accessToken, saveArtistsInfo) => {
        try {
            const data = await spotifyServices.getFollowedArtists(accessToken);
            return data.artists.items.slice(9, 14).map(artist => artist.id);
        }
        catch (error) { console.error('Failed to get followed artists', error) };
    },

    handleTopTracksRequest: async (accessToken, artistID, saveTopTracks) => {
        try {
            const data = await spotifyServices.getArtistTopTracks(accessToken, artistID);
            if (data) saveTopTracks(data);
        }
        catch (error) { console.error('Failed to get top tracks', error) };
    },

    handleRelatedArtistsRequest: async (accessToken, artistID, saveRelatedArtists) => {
        try {
            const data = await spotifyServices.getRelatedArtists(accessToken, artistID);
            console.log(data);
            if (data) saveRelatedArtists(data);
        }
        catch (error) { console.error('Failed to get related artists', error) };
    },

    handleRecommendationsRequest: async (accessToken, seedArtists, seedGenres, seedTracks, saveRecommendations) => {
        try {
            const data = await spotifyServices.getRecommendations(accessToken, seedArtists, seedGenres, seedTracks);
            console.log(data);
            if (data) saveRecommendations(data);
        }
        catch (error) { console.error('Failed to get recommendations', error) };
    },
};


export default spotifyControllers;