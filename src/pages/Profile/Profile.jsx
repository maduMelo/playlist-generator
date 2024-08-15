import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import spotifyControllers from "../../controllers/spotifyControllers";

import "./Profile.css";

import User from "./components/User";


function Profile() {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access_token');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (accessToken) spotifyControllers.handleProfileRequest(accessToken, setData);
    }, [accessToken]);

    return (
        <div>
            {data ? <User data={data} /> : <p>Não gerou token</p>}
            <button onClick={() => { navigate('/profile/app', { state: data.id }) }}>
                Gerar Playlist
            </button>
        </div>
    );
};

export default Profile;