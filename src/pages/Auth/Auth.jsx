import './Auth.css';

import authControllers from '../../controllers/authController';

import SpotifyButton from '../../components/SpotifyButton';


function Auth() {
    return (
        <div className='gradient'>
                <h1>Create your playlists in a fun way!</h1>
                <p>Log in to your account and start creating playlists how you never thought before.</p>

                <div className='button-container'>
                    <SpotifyButton
                        text='Log in'
                        buttonClass='green'
                        action={authControllers.handleAuthorizationRequest}
                    />
                </div>
        </div>
    );
};

export default Auth;