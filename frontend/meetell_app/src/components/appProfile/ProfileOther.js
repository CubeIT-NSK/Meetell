import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProfileOther() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [friend, setFriend] = useState(null);
    const [fullProfile, setFullProfile] = useState(false);

    useEffect(() => {
        if (!userId) {
            navigate('/home');
            return;
        }

        fetch(`/api/user?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFriend(data);

            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                navigate('/home');
            });
    }, [userId, navigate]);

    return (
        <>{friend && (
            <></>
        )}</>
    );
}

export default ProfileOther;
