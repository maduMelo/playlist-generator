import './ButtonsGrid.css';

import strawberries from '../assets/strawberries.jpg';
import avocados from '../assets/avocados.jpg';
import grapes from '../assets/grapes.jpg';
import bananas from '../assets/bananas.png';

export default function FruitButton() {

    return (
        <div className='fruit-button-grid'>
            <button className="fruit-button strawberries">
                <div className='img-container'><img src={strawberries} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button bananas">
                <div className='img-container'><img src={bananas} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button avocados">
                <div className='img-container'><img src={avocados} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button grapes">
                <div className='img-container'><img src={grapes} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>
        </div>
    );
};