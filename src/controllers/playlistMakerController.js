import spotifyControllers from './spotifyControllers';

const playlistMakerController = {
    getTracksSuggestions: async (accessToken, setSuggestedTracks) => {
        const followedArtists = await spotifyControllers.getFollowedArtists(accessToken, { limit: 1 });
        const totalArtists = followedArtists.total * 1;

        const randomOffset = Math.floor(Math.random() * totalArtists);
        const myArtists = await spotifyControllers.getFollowedArtists(accessToken, { limit: 50, offset: randomOffset });

        let newTracks = [];

        let selectedArtists = 0;
        for (let i = 0; i < myArtists.items.length; i++) {
            if (selectedArtists >= 3) break;

            const randomIndex = Math.floor(Math.random() * myArtists.items.length);
            const relatedArtistsIDs = await spotifyControllers.getRelatedArtists(accessToken, myArtists.items[randomIndex].id);

            const suggestions = await spotifyControllers.getRecommendations(accessToken, relatedArtistsIDs.join(','), '', '');

            newTracks.push(...suggestions);
            selectedArtists++;
        };

        setSuggestedTracks(prevTracks => [...prevTracks, ...newTracks]);
    },

    createPlaylistOnSpotify: async (accessToken, userID, playlistContent, setPlaylistContent) => {
        const body = {
            name: playlistContent.name ? playlistContent.name : 'My Playlist',
            description: 'Playlist created by Playlist Maker',
            public: true
        };
        const playlistID = await spotifyControllers.createPlaylist(accessToken, userID, body);

        const tracksIDs = playlistContent.tracks.map(track => `spotify:track:${track.id}`);
        await spotifyControllers.addTracksOnPlaylist(accessToken, playlistID, tracksIDs);

        setPlaylistContent(prevContent => ({ ...prevContent, isDone: true, id: playlistID }));
    },
};


export default playlistMakerController;