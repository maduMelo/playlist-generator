import './GreenButton.css';
import './TransparentButton.css';

function Button({ text, buttonClass, action }) {
    return (
        <div className={`${buttonClass}-button-container`}>
            <button className={`${buttonClass}-button`} onClick={action}>{text}</button>
        </div>
    );
};

export default Button;