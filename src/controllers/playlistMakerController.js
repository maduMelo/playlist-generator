import spotifyControllers from './spotifyControllers';

const playlistMakerController = {
    getTracksSuggestions: async (accessToken, setSuggestedTracks) => {
        // 3 artists
        const myArtistsIDs = await spotifyControllers.getFollowedArtists(accessToken);

        const relatedArtistsPromises = await myArtistsIDs.map(async artistID => {
            return await spotifyControllers.getRelatedArtists(accessToken, artistID);
        });

        // 3 arrays with 5 artists each
        const relatedArtists = await Promise.all(relatedArtistsPromises); // add error handling

        const recommendationsPromises = relatedArtists.map(async (relatedArtistsIDs) => {
            return await spotifyControllers.getRecommendations(accessToken, relatedArtistsIDs.join(','), '', '');
        });

        // 3 arrays with the objetc of the tracks that have preview url
        const suggestedTracksList = await Promise.all(recommendationsPromises); // add error handling

        // List of tracks (objects)
        setSuggestedTracks(suggestedTracksList.flat());
    },

    // Here
    createPlaylistOnSpotify: async (accessToken, userID, playlistContent, setPlaylistContent) => {
        const body = {
            name: playlistContent.name ? playlistContent.name : 'My Playlist', // Here changed
            description: 'Playlist created by Playlist Maker',
            public: true
        };
        const playlistID = await spotifyControllers.createPlaylist(accessToken, userID, body);

        const tracksIDs = playlistContent.tracks.map(track => `spotify:track:${track.id}`); // Here
        await spotifyControllers.addTracksOnPlaylist(accessToken, playlistID, tracksIDs);

        setPlaylistContent(prevContent => ({ ...prevContent, isDone: true, id: playlistID })); // Here changed
    },
};


export default playlistMakerController;