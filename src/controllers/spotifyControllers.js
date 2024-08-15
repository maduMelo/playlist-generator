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
};


export default spotifyControllers;