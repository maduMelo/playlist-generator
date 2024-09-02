import TrackOnPlaylist from './components/TrackOnPlaylist';

export default function LeftSection({ playlist }) {

    return(
        <div className='playlist-container'>
            {playlist.tracks.map((track, index) => <TrackOnPlaylist key={index} order={index} track={track} />)}
        </div>
    );
};