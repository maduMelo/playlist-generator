import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './PlaylistMaker.css';
import './components/TrackOnPlaylist.css';

import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';


function PlaylistMaker() {
    const location = useLocation();
    const userID = location.state;
    const accessToken = localStorage.getItem('access_token');

    const [suggestedTracks, setSuggestedTracks] = useState([]); // State to store the suggested tracks
    const [direction, setDirection] = useState('left'); // State to control the direction of the card swipe
    const [playlistContent, setPlaylistContent] = useState({ isDone: false, id: null, name: null, tracks: [] });


    const addTrackOnPlaylist = () => {
        const track = suggestedTracks[0];
        setDirection('right');

        setTimeout(() => {
            setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));

            setPlaylistContent(prevPlaylistContent => ({
                ...prevPlaylistContent, tracks: [...prevPlaylistContent.tracks, track]
            }));
        }, 2);

    };

    const rejectTrack = () => {
        setDirection('left');
        setTimeout(() => { setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1)) }, 2);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') document.getElementById('add').click();
        else if (event.key === 'ArrowLeft') document.getElementById('reject').click();
    };

    useEffect(() => {
        //playlistMakerController.getTracksSuggestions(accessToken, setSuggestedTracks);

        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown) };
    }, []);

    return (
        <div className='playlist-maker-container'>
            <LeftSection
                playlist={playlistContent}
            />

            <MiddleSection
                suggestedTracks={suggestedTracks}
                rejectTrack={rejectTrack}
                addTrackOnPlaylist={addTrackOnPlaylist}
                direction={direction}
            />

            <RightSection
                playlist={playlistContent}
                setPlaylist={setPlaylistContent}
                accessToken={accessToken}
                userID={userID}
            />
        </div>
    );
};

export default PlaylistMaker;