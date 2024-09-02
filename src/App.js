import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Auth from './pages/Auth/Auth';
import Callback from './pages/Callback';
import Profile from './pages/Profile/Profile';
import PlaylistMaker from './pages/PlaylistMaker/PlaylistMaker';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Auth />} />
                    <Route path='/callback' element={<Callback />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/app' element={<PlaylistMaker />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
