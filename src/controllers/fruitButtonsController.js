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
        console.log('avocadoSearch');
    },

    grapeSearch: async (accessToken, setSuggestedTracks) => {
        console.log('grapeSearch');
    }
};


export default fruitButtonsController;