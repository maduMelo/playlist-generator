import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';

import TrackPreview from './components/TrackPreview';

import spotifyControllers from '../../controllers/spotifyControllers';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;

    const accessToken = localStorage.getItem('access_token');


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


    // Temporary
    const [track, setTrack] = useState(null);
    const trackId = '5eTNdkstwKaNahHf41fJ9u'; // Hotter than hell


    // Getting my followed artists ----------------------------------------
    const [artists, setArtists] = useState([]);
    // 4dpARuHxo51G3z768sgnrY - Adele
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);


    async function createPlaylist() {
        await spotifyControllers.handlePlaylistCreation(userID, setPlaylistId, accessToken, playlistConfig);
    };

    async function addTracks() {
        await spotifyControllers.handleTracksAddition(accessToken, playlistId, tracks);
    };

    async function getTrackPreview() {
        await spotifyControllers.handleTrackRequest(accessToken, trackId, setTrack);
    };

    async function getMyArtists() {
        await spotifyControllers.handleGetFollowedArtists(accessToken, setArtists);
    };

    async function getRelatedArtists() {
        await spotifyControllers.handleRelatedArtistsRequest(accessToken, '4K9OTkRXEFL6NDXFTqVmq9', setRelatedArtists);
    };

    async function getRecommendations() {
        await spotifyControllers.handleRecommendationsRequest(accessToken, '6Gi8ZaXGx8MK79HwzXpuVZ,6RHKEd9dpzQ4c09x8Zdaxu,6bh228LGC3eAzbplPWV02r,2LuHL7im4aCEmfOlD4rxBC,0xu4jAQQv7ZAqvFGdc9HgP', '', '', setRecommendations);
    };

    async function getArtistTopTracks() {
        await spotifyControllers.handleTopTracksRequest(accessToken, '4dpARuHxo51G3z768sgnrY', setArtistTopTracks);
    };


    return (
        <div>
            <h1>Playlist Maker Page</h1>

            <button onClick={createPlaylist}>Create Playlist</button>
            <button onClick={addTracks}>Add Tracks</button>
            <button onClick={getMyArtists}>Get My Artists</button>
            <button onClick={getRelatedArtists}>Get related artists</button>
            <button onClick={getRecommendations}>Get recommendations</button>

            <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank" rel="noopener noreferrer">
                Go to Playlist
            </a>

            <button onClick={getTrackPreview}>Get Track</button>
            {track ? <TrackPreview track={track} /> : <p>No track</p>}
        </div>
    );
};

export default PlaylistMaker;