import React from 'react';
import './ButtonsGrid.css';

import fruitButtonsController from '../controllers/fruitButtonsController';

import strawberries from '../assets/strawberries.jpg';
import avocados from '../assets/avocados.jpg';
import grapes from '../assets/grapes.jpg';
import bananas from '../assets/bananas.png';

export default function ButtonsGrid({ setSuggestedTracks }) {
    const accessToken = localStorage.getItem('access_token');
    const [bananaOffset, setBananaOffset] = React.useState(0);
    const [grapeOffset, setGrapeOffset] = React.useState(0);

    const clickStrawberry = () => fruitButtonsController.strawberrySearch(accessToken, setSuggestedTracks);

    const clickBanana = () => {
        const params = { limit: 5, offset: bananaOffset };
        fruitButtonsController.bananaSearch(accessToken, setSuggestedTracks, params);
        setBananaOffset(bananaOffset + 5);
    };

    const clickAvocado = () => fruitButtonsController.avocadoSearch(accessToken, setSuggestedTracks);

    const clickGrape = () => {
        const params = { limit: 15, offset: grapeOffset };
        fruitButtonsController.grapeSearch(accessToken, setSuggestedTracks, params);
        setGrapeOffset(grapeOffset + 5);
    };

    return (
        <div className='fruit-button-grid'>
            <button className="fruit-button strawberries" onClick={clickStrawberry}>
                <div className='img-container'><img src={strawberries} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button bananas" onClick={clickBanana}>
                <div className='img-container'><img src={bananas} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button avocados" onClick={clickAvocado}>
                <div className='img-container'><img src={avocados} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>

            <button className="fruit-button grapes" onClick={clickGrape}>
                <div className='img-container'><img src={grapes} alt="" /></div>
                <div className='more-songs'>+ songs</div>
            </button>
        </div>
    );
};