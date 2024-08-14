import React, { useEffect, useState } from 'react';

import User from '../User';

function Main() {
    const accessToken = localStorage.getItem('access_token');
    const [data, setData] = useState(null);

    const [playlistId, setPlaylistId] = useState(''); // Temporary

    async function getProfile() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();
            setData(result);
            
        } catch (error) {
            console.error('Failed to get profile', error); 
        };
    };

    async function createPlaylist() {
        const playlistName = 'My Playlist From React'; // Temporary
        const description = 'First playlist created with React by me to test for my app'; // Temporary

        const url = `https://api.spotify.com/v1/users/${data.id}/playlists`;

        const body = {
            name: playlistName,
            description,
            public: true
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            setPlaylistId(result.id); // Temporary
            console.log('Playlist created', result); // Debug

        } catch (error) {
            console.error('Failed to create playlist', error);
        }
    };

    async function addTracks() {
        const tracks = [
            'spotify:track:1QEt5w1GmR7opjz1kLUXbU',
            'spotify:track:5M4Dxko4d3ja1CnIUmYVqA',
            'spotify:track:78tx7xOBWGrPZacg3tYdX3',
            'spotify:track:6dOtVTDdiauQNBQEDOtlAB'
        ]; // Temporary

        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uris: tracks })
            });

            const result = await response.json();
            console.log('Tracks added', result); // Debug

        } catch (error) {
            console.error('Failed to add tracks', error);
        };
    };

    useEffect(() => {
        if (accessToken) getProfile();
    }, [accessToken]);

    return (
        <div>
            <h1>Main Page</h1>
            { data ? <User data={data}/> : <p>Não gerou token</p> }
            
            <button onClick={createPlaylist}>Create Playlist</button>
            <button onClick={addTracks}>Add Tracks</button>

            <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank" rel="noopener noreferrer">
                Go to Playlist
            </a>
        </div>
    );
};

export default Main;