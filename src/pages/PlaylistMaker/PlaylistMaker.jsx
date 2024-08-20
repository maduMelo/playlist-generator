import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';
import './components/TrackOnPlaylist.css';
import rejectLogo from '../../assets/reject.png';
import addLogo from '../../assets/add.png';

import TrackPreview from './components/TrackPreview';
import TrackOnPlaylist from './components/TrackOnPlaylist';
import Button from '../../components/Button';

import spotifyControllers from '../../controllers/spotifyControllers';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;

    const accessToken = localStorage.getItem('access_token');

    const [suggestedTracks, setSuggestedTracks] = useState([]); // State to store the suggested tracks
    const [isPlaylistDone, setIsPlaylistDone] = useState(false); // State to tell if the suggetions are ready

    const [playlist, setPlaylist] = useState([]);
    const [playlistID, setPlaylistID] = useState(null);
    const [playlistName, setPlaylistName] = useState('');


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
    };

    async function createPlaylist() {
        const body = {
            name: playlistName ? playlistName : 'My Playlist',
            description: 'Playlist created by Playlist Maker',
            public: true
        };
        const playlistID = await spotifyControllers.createPlaylist(accessToken, userID, body);
        
        const tracksIDs = playlist.map(track => `spotify:track:${track.id}`);
        await spotifyControllers.addTracksOnPlaylist(accessToken, playlistID, tracksIDs);
        
        setPlaylistID(playlistID);
        setIsPlaylistDone(true);
    };
    
    const addTrackOnPlaylist = () => {
        const track = suggestedTracks[0];
        setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));
        setPlaylist(prevPlaylist => [...prevPlaylist, track]);
    };

    const rejectTrack = () => {
        setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') document.getElementById('add').click();
        else if (event.key === 'ArrowLeft') document.getElementById('reject').click();
    };

    const handleNameInput = (event) => {
        setPlaylistName(event.target.value);
    };

    useEffect(() => {
        getTracksSuggestions();

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='playlist-maker-container'>

            <div className='playlist-container'>
                { playlist.map((track, index) =>  <TrackOnPlaylist key={index} order={index} track={track} />) }
            </div>

            <div className='playlist-maker-center'>
                <h1>Playlist Maker Page</h1>

                {
                    suggestedTracks.length > 0 ?
                    <TrackPreview track={suggestedTracks[0]} /> :
                    <p>Searching for tracks you might like it...</p>
                }

                <div className='playilst-modifiers-container'>
                    <button onClick={rejectTrack} id='reject'>
                        <img src={rejectLogo} alt="Reject" />
                    </button>
                    <button onClick={addTrackOnPlaylist} id='add'>
                        <img src={addLogo} alt="Add" />
                    </button>
                </div>
            </div>
            
            <div className='playlist-maker-right'>
                <input type="text" className='playlist-name-input'
                    placeholder='Give your playlist a name...'
                    onChange={handleNameInput}
                    value={playlistName}
                />

                {
                    playlist.length > 0 && !isPlaylistDone &&
                    <button onClick={createPlaylist} className='create-playlist-button'>Create Playlist</button>
                }

                {
                    isPlaylistDone &&
                    <a href={`https://open.spotify.com/playlist/${playlistID}`} target="_blank" rel="noopener noreferrer">
                        Go to Playlist
                    </a>
                }
            </div>
            
        </div>
    );
};

export default PlaylistMaker;