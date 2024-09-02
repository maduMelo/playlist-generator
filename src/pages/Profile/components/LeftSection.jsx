import TrackOnPlaylist from '../../../components/TrackOnPlaylist';

export default function LeftSection({ playlist, setPlaylist }) {

    return(
        <div className='playlist-container'>
            {
                playlist.tracks.map((track, index) => {
                    return (
                        <TrackOnPlaylist key={index} order={index} track={track} setPlaylist={setPlaylist} />
                    );
                })
            }
        </div>
    );
};