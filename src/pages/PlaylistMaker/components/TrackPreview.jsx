import './TrackPreview.css';

import { useState, useEffect } from 'react';

function TrackPreview({ track }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const handlePlay = () => {
        const audio = document.getElementById('audio-player');

        if (isPlaying) audio.pause()
        else audio.play();

        setIsPlaying(!isPlaying);
    };

    const artists = track.artists.map(artist => artist.name).join(', ');

    return (
        <div className="track-preview-container">
            <div className='img-player-container'>
                <img src={track.album.images[1].url} alt={track.name} />
                {
                    isPlaying ? 
                    <button className='play-button' onClick={handlePlay}>&#10073;&#10073;</button> : 
                    <button className='play-button' onClick={handlePlay}>&#9658;</button>
                }
            </div>

            <div className='track-info'>
                <h3 className='track-name'>{track.name}</h3>
                <p className='track-artists'>{artists}</p>
            </div>

            <audio controls autoPlay id='audio-player'>
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default TrackPreview;