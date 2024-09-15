import User from "../../../components/User";
import ButtonsGrid from "../../../components/ButtonsGrid";

import playlistMakerController from "../../../controllers/playlistMakerController";

export default function RightSection({ setPlaylist, playlist, accessToken, userInfo }) {
    
    const handleNameInput = (event) => {
        setPlaylist(prevPlaylist => ({ ...prevPlaylist, name: event.target.value }));
    };

    const handleCreatePlaylist = async () => {
        await playlistMakerController.createPlaylistOnSpotify(accessToken, userInfo.id, playlist, setPlaylist);
    };
    
    return (
        <div className='playlist-maker-right'>
            <User data={userInfo} />

            <ButtonsGrid />

            <input type="text" className='playlist-name-input'
                placeholder='Give your playlist a name...'
                onChange={handleNameInput}
                value={playlist.name}
            />

            {
                playlist.tracks.length > 0 && !playlist.isDone &&
                <button onClick={handleCreatePlaylist} className='create-playlist-button'>Create Playlist</button>
            }

            {
                playlist.isDone &&
                <a href={`https://open.spotify.com/playlist/${playlist.id}`} target="_blank" rel="noopener noreferrer">
                    Go to Playlist
                </a>
            }
        </div>
    );
};