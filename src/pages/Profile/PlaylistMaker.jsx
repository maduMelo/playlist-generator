import React from 'react';

import './PlaylistMaker.css';

import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';


function PlaylistMaker({ data }) {

    const trackExample = {
        name: "Example Track",
        artists: [
            { name: "Artist 1" },
            { name: "Artist 2" }
        ],
        album: {
            images: [
                { url: "https://via.placeholder.com/150" },  // Low resolution image
                { url: "https://via.placeholder.com/300" },  // Medium resolution image
                { url: "https://via.placeholder.com/600" }   // High resolution image
            ]
        }
    };

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