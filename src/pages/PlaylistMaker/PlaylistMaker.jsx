import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';

import TrackPreview from './components/TrackPreview';

import spotifyControllers from '../../controllers/spotifyControllers';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;

    const accessToken = localStorage.getItem('access_token');

    const [suggestedTracks, setSuggestedTracks] = useState([]);
    const [track, setTrack] = useState(false); // Temporary
    


    // Creating playlist ---------------------------------------------

    const [playlistConfig, setPlaylistConfig] = useState({
        name: 'My Playlist From React',
        description: 'First playlist created with React by me to test for my app',
        public: true
    }); // Temporary
    const [playlistId, setPlaylistId] = useState(''); // Temporary

    // Adding track --------------------------------------------------

    const tracks = [
        'spotify:track:1QEt5w1GmR7opjz1kLUXbU',
        'spotify:track:5M4Dxko4d3ja1CnIUmYVqA',
        'spotify:track:78tx7xOBWGrPZacg3tYdX3',
        'spotify:track:6dOtVTDdiauQNBQEDOtlAB'
    ]; // Temporary

    const pretendTrack = {
        name: 'Deixa (feat. Ana Gabriela) - Ao Vivo',
        album: { images: [ null, { url: 'https://i.scdn.co/image/ab67616d00001e024de739135ec975b47e65cddd' } ] },
        artists: [ { name: 'Madu' }, { name: 'Ana Gabriela' }, { name: 'Jão' } ],
        preview_url: 'https://p.scdn.co/mp3-preview/8eae5b4d3281ab73a9713f571ca6dfffb7d40480?cid=c1afb4462ef3439f84d46b1a83b9b505'
    }; // Temporary


    async function createPlaylist() {
        await spotifyControllers.createPlaylist(userID, setPlaylistId, accessToken, playlistConfig);
    };

    async function addTracks() {
        await spotifyControllers.addTracksOnPlaylist(accessToken, playlistId, tracks);
    };


    // Montando o monstrinho
    async function getTracksSuggestions() {
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
        setTrack(true);
    };
    

    return (
        <div>
            <h1>Playlist Maker Page</h1>

            <button onClick={createPlaylist}>Create Playlist</button>
            <button onClick={addTracks}>Add Tracks</button>
            <button onClick={getTracksSuggestions}>TESTE</button>

            <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank" rel="noopener noreferrer">
                Go to Playlist
            </a>
            
            {
                track ?
                suggestedTracks.slice(0, 3).map(track => <TrackPreview key={track.id} track={track} />) :
                <p>No tracks</p>
            }
        </div>
    );
};

export default PlaylistMaker;


/*
<TrackPreview track={pretendTrack} />



*/