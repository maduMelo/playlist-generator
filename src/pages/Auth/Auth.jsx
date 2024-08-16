import './Auth.css';

import authControllers from '../../controllers/authController';

import Button from '../../components/Button';


function Auth() {
    return (
        <div>
            <h1 className='tst'>Auth</h1>
            <Button
                text='Log in'
                buttonClass='green'
                action={authControllers.handleAuthorizationRequest}
            />
        </div>
    );
};

export default Auth;