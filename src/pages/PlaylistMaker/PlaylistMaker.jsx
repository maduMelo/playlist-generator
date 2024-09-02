import React from 'react';

import './PlaylistMaker.css';
import './components/TrackOnPlaylist.css';

import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';


function PlaylistMaker({ data }) {
    const accessToken = localStorage.getItem('access_token');
    const [playlistContent, setPlaylistContent] = React.useState({ isDone: false, id: null, name: null, tracks: [] });


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
                userInfo={data}
            />
        </div>
    );
};

export default PlaylistMaker;