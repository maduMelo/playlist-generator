import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';

import TrackPreview from './components/TrackPreview';

import spotifyControllers from '../../controllers/spotifyControllers';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;

    const accessToken = localStorage.getItem('access_token');

    const [playlistConfig, setPlaylistConfig] = useState({
        name: 'My Playlist From React',
        description: 'First playlist created with React by me to test for my app',
        public: true
    }); // Temporary
    const [playlistId, setPlaylistId] = useState(''); // Temporary


    const tracks = [
        'spotify:track:1QEt5w1GmR7opjz1kLUXbU',
        'spotify:track:5M4Dxko4d3ja1CnIUmYVqA',
        'spotify:track:78tx7xOBWGrPZacg3tYdX3',
        'spotify:track:6dOtVTDdiauQNBQEDOtlAB'
    ]; // Temporary


    // Temporary
    const [track, setTrack] = useState(null);
    const trackId = '5eTNdkstwKaNahHf41fJ9u'; // Hotter than hell


    async function createPlaylist() {
        await spotifyControllers.handlePlaylistCreation(userID, setPlaylistId, accessToken, playlistConfig);
    };

    async function addTracks() {
        await spotifyControllers.handleTracksAddition(accessToken, playlistId, tracks);
    };

    async function getTrackPreview() {
        await spotifyControllers.handleTrackRequest(accessToken, trackId, setTrack);
    };


    return (
        <div>
            <h1>Playlist Maker Page</h1>

            <button onClick={createPlaylist}>Create Playlist</button>
            <button onClick={addTracks}>Add Tracks</button>

            <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank" rel="noopener noreferrer">
                Go to Playlist
            </a>

            <button onClick={getTrackPreview}>Get Track</button>
            {track ? <TrackPreview track={track} /> : <p>No track</p>}
        </div>
    );
};

export default PlaylistMaker;