import './TrackOnPlaylist.css';

function TrackOnPlaylist({ track, order, setPlaylist }) {

    const handleDeleteTrack = () => {
        setPlaylist(prevPlaylist => {
            return {
                ...prevPlaylist,
                tracks: prevPlaylist.tracks.filter((_, index) => index !== order)
            };
        });
    };

    return (
        <div className='track-on-playlist'>
            <p className="order">{order+1}</p>
            <img src={track.album.images[2].url} alt={track.name} />

            <div className='track-on-playlist-info'>
                <h5>{track.name}</h5>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>

            <div className='delete-track-container'><button className='delete-track' onClick={handleDeleteTrack}>
                <span className="material-symbols-outlined">do_not_disturb_on</span>
            </button></div>
            
        </div>
    );
};


export default TrackOnPlaylist;