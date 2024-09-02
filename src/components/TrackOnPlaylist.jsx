import './TrackOnPlaylist.css';

function TrackOnPlaylist({ track, order }) {
    return (
        <div className='track-on-playlist'>
            <p className="order">{order+1}</p>
            <img src={track.album.images[2].url} alt={track.name} />

            <div className='track-on-playlist-info'>
                <h5>{track.name}</h5>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
        </div>
    );
};


export default TrackOnPlaylist;