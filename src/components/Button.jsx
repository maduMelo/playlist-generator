import './GreenButton.css';

function Button({ text, buttonClass, action }) {
    return (
        <button className={`${buttonClass}-button`} onClick={action}>{text}</button>
    );
};

export default Button;