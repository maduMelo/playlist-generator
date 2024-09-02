import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TrackPreview from './components/TrackPreview';

import rejectLogo from '../../assets/reject.png';
import addLogo from '../../assets/add.png';


export default function MiddleSection({ suggestedTracks, rejectTrack, addTrackOnPlaylist, direction }) {
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