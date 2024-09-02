import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TrackPreview from '../../../components/TrackPreview';

import playlistMakerController from '../../../controllers/playlistMakerController';

import rejectLogo from '../../../assets/reject.png';
import addLogo from '../../../assets/add.png';


export default function MiddleSection({ setPlaylist, accessToken }) {

    const [suggestedTracks, setSuggestedTracks] = React.useState([]); // State to store the suggested tracks
    const [direction, setDirection] = React.useState('left'); // State to control the direction of the card swipe

    const addTrackOnPlaylist = () => {
        const track = suggestedTracks[0];
        setDirection('right');

        setTimeout(() => {
            setSuggestedTracks(prevSeggestions => prevSeggestions.slice(1));

            setPlaylist(prevPlaylistContent => ({
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

    React.useEffect(() => {
        //playlistMakerController.getTracksSuggestions(accessToken, setSuggestedTracks);

        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown) };
    }, []);


    return (
        <div className='playlist-maker-center'>
            <h1>Playlist Maker Page</h1>

            <div className='animation-container'>
                <TransitionGroup>
                    {
                        suggestedTracks.length > 0 &&
                        <CSSTransition
                            key={suggestedTracks[0].id}
                            timeout={500}
                            classNames={direction}
                        >
                            <div className='animation-card'>
                                <TrackPreview track={suggestedTracks[0]} />
                            </div>

                        </CSSTransition>
                    }
                </TransitionGroup>
            </div>

            <div className='playilst-modifiers-container'>
                <button onClick={rejectTrack} id='reject'><img src={rejectLogo} alt="Reject" /></button>
                <button onClick={addTrackOnPlaylist} id='add'><img src={addLogo} alt="Add" /></button>
            </div>
        </div>
    );
};