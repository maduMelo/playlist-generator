import './Auth.css';

import authControllers from '../../controllers/authController';

function Auth() {
    return (
        <div>
            <h1 className='tst'>Auth</h1>
            <button onClick={authControllers.handleAuthorizationRequest}>Log in</button>
        </div>
    );
};

export default Auth;