function TrackPreview({ track }) {
    return (
        <div className="track-preview">
            <img src={track.album.images[0].url} alt={track.name} />
            <h2>{track.name}</h2>
            <p>{track.artists[0].name}</p>
            <audio controls autoPlay>
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default TrackPreview;