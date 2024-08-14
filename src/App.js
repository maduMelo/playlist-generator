import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

import Landing from './components/pages/Landing';
import Callback from './components/pages/Callback';
import Main from './components/pages/Main';


function App() {
    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Landing /> } />
                    <Route path='/callback' element={ <Callback /> } />
                    <Route path='/app' element={ <Main /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
