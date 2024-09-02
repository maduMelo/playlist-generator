import React, { useEffect, useState } from "react";

import spotifyControllers from "../../controllers/spotifyControllers";

import PlaylistMaker from "./PlaylistMaker";


function Profile() {
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