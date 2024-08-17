import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';

import TrackPreview from './components/TrackPreview';

import spotifyControllers from '../../controllers/spotifyControllers';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;

    const accessToken = localStorage.getItem('access_token');

    const [suggestedTracks, setSuggestedTracks] = useState([]); // State to store the suggested tracks

    const [track, setTrack] = useState(false); // State to tell if the suggetions are ready

    const [playlist, setPlaylist] = useState([]);
    const [playlistID, setPlaylistID] = useState(null);


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
        console.log('Gerou sugestões!');
    };
    
    const addTrackOnPlaylist = () => {
        const track = suggestedTracks[0];
        setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));
        setPlaylist([...playlist, track]);
    };

    const rejectTrack = () => {
        setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));
        console.log(playlist);
    };

    useEffect(() => {
        //getTracksSuggestions();
    }, []);


    return (
        <div>
            <h1>Playlist Maker Page</h1>
            {
                suggestedTracks.length > 0 ?
                <TrackPreview track={suggestedTracks[0]} /> :
                <p>Searching for tracks you might like it...</p>
            }
            
            <button onClick={rejectTrack}>Reject Track</button>
            <button onClick={addTrackOnPlaylist}>Add on Playlist</button>


            
        </div>
    );
};

export default PlaylistMaker;


/*

<button onClick={createPlaylist}>Create Playlist</button>
            <button onClick={addTracks}>Add Tracks</button>
            <button onClick={getTracksSuggestions}>TESTE</button>

            <a href={`https://open.spotify.com/playlist/${playlistID}`} target="_blank" rel="noopener noreferrer">
                Go to Playlist
            </a>

*/