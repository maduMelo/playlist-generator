import React from 'react';

import './PlaylistMaker.css';

import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';


function PlaylistMaker({ data }) {
    
    const accessToken = localStorage.getItem('access_token');
    const [playlistContent, setPlaylistContent] = React.useState({ isDone: false, id: null, name: null, tracks: [] });

    return (
        <div className='playlist-maker-container'>
            <LeftSection
                playlist={playlistContent}
                setPlaylist={setPlaylistContent}
            />

            <MiddleSection
                setPlaylist={setPlaylistContent}
                accessToken={accessToken}
            />

            <RightSection
                playlist={playlistContent}
                setPlaylist={setPlaylistContent}
                accessToken={accessToken}
                userInfo={data}
            />
        </div>
    );
};

export default PlaylistMaker;