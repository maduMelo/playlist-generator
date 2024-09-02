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

    const [playlistContent, setPlaylistContent] = useState({ isDone: false, id: null, name: null, tracks: [] });


    return (
        <div className='playlist-maker-container'>
            <LeftSection
                playlist={playlistContent}
            />

            <MiddleSection
                setPlaylist={setPlaylistContent}
                accessToken={accessToken}
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