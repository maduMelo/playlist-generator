import spotifyControllers from "./spotifyControllers";

const fruitButtonsController = {
    strawberrySearch: async (accessToken, setSuggestedTracks) => {
        console.log('strawberrySearch');
    },

    bananaSearch: async (accessToken, setSuggestedTracks, params) => {
        const myTops = await spotifyControllers.getMyTops(accessToken, params, 'tracks');
        const newTracks = await spotifyControllers.getRecommendations(accessToken, '', '', myTops.join(','));
        setSuggestedTracks(prevTracks => [...prevTracks, ...newTracks]);
    },

    avocadoSearch: async (accessToken, setSuggestedTracks) => {
        const response = await spotifyControllers.getMySavedTracks(accessToken, { limit: 1 });
        const totalSavedTracks = response.total * 1;

        const randomOffset = Math.floor(Math.random() * totalSavedTracks);
        const newResponse = await spotifyControllers.getMySavedTracks(accessToken, { limit: 50, offset: randomOffset });
        const mySavedTracks = newResponse.items;

        let newTracks = [];
        let seedTracks = [];

        for (let i = 0; i < 25; i++) {
            let trackIndex = Math.floor(Math.random() * mySavedTracks.length);
            let track = mySavedTracks[trackIndex].track;

            if (i < 5) seedTracks.push(track.id)
            else if (track.preview_url) newTracks.push(track);
        };

        const moreNewTracks = await spotifyControllers.getRecommendations(accessToken, '', '', seedTracks.join(','));

        setSuggestedTracks(prevTracks => [...prevTracks, ...newTracks, ...moreNewTracks]);
    },

    grapeSearch: async (accessToken, setSuggestedTracks) => {
        console.log('grapeSearch');
    }
};


export default fruitButtonsController;