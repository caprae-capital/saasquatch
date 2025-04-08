import React, {useContext, useEffect, useState} from 'react';
import Avatar from 'react-avatar';
import {DataContext} from "../shared/DataContext";

function ProfileAvatar({ size = 50}) {
    const { currentUser } = useContext(DataContext);
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(`${currentUser.first_name} ${currentUser.last_name}`);
        }
    }, [currentUser]);

    return (
        <Avatar name={name} size={size} round={true} />
    );
}

export default ProfileAvatar;
