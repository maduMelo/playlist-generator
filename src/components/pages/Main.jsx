import React, { useEffect, useState } from 'react';

import User from '../User';

function Main() {
    const accessToken = localStorage.getItem('access_token');
    const [data, setData] = useState(null);

    async function getProfile() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();
            setData(result);
            console.log('Profile', result);
            
        } catch (error) {
            console.error('Failed to get profile', error); 
        };
    };

    useEffect(() => {
        if (accessToken) getProfile();
    }, [accessToken]);

    return (
        <div>
            <h1>Main Page</h1>
            { data ? <User data={data}/> : <p>Não gerou token</p> }
        </div>
    );
};

export default Main;