import './TrackPreview.css';

import { useState, useEffect } from 'react';

function TrackPreview({ track }) {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const artists = track.artists.map(artist => artist.name).join(', ');

    const handlePlay = () => {
        if (isPlaying) audio.pause()
        else audio.play();

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audio) {
            audio.pause();
            audio.remove()
        };

        const newAudio = new Audio(track.preview_url);
        setAudio(newAudio);

        if (isPlaying) newAudio.play();

        return () => {
            newAudio.pause();
            newAudio.remove();
        };
    }, [track]);

    return (
        <div className="track-preview-container">
            <div className='img-player-container'>
                <img src={track.album.images[1].url} alt={track.name} />
                {
                    isPlaying ? 
                    <button className='play-button' onClick={handlePlay}>&#10073;&#10073;</button> : 
                    <button className='play-button' onClick={handlePlay}>&#9654;</button>
                }
            </div>

            <div className='track-info'>
                <h3 className='track-name'>{track.name}</h3>
                <p className='track-artists'>{artists}</p>
            </div>
        </div>
    );
};

export default TrackPreview;