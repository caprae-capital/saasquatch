import React, {useContext, useEffect, useState} from 'react';
import { ChevronDown } from 'lucide-react';
import logo from "../../assets/logo.svg";
import ProfileSettings from './ProfileSettings';
import '../../css/Header.css';
import ProfileAvatar from "./ProfileAvatar";
import {DataContext} from "../shared/DataContext";

function Header() {
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const { currentUser } = useContext(DataContext);
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(`${currentUser.first_name} ${currentUser.last_name}`);
        }
    }, [currentUser]);

    return (
        <div className="header-container">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-content">
                        <div className="navbar-left">
                            <div className="navbar-logo">
                                <img src={logo || ""} alt="Saasquatch"/>
                            </div>
                        </div>
                        <div className="navbar-right">
                            <button onClick={() => setShowProfileSettings(true)} className="profile-button">
                                <ProfileAvatar size={"32"}/>
                                <span className="profile-name">{name}</span>
                                <ChevronDown class="profile-chevron"/>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {showProfileSettings && <ProfileSettings setShowProfileSettings={setShowProfileSettings}/>}
        </div>
    );
}

export default Header;
