import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import spotifyControllers from "../../controllers/spotifyControllers";

import "./Profile.css";

import User from "../../components/User";
import Button from "../../components/Button";

import PlaylistMaker from "../PlaylistMaker/PlaylistMaker";


function Profile() {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access_token');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (accessToken) spotifyControllers.getProfile(accessToken, setData);
    }, [accessToken]);

    return (
        <>
            { data ? <PlaylistMaker data={data} /> : <p>Não gerou token</p> }
        </>
    );
};

export default Profile;


// 
// <button onClick={() => console.log(data)}>TESTE</button>