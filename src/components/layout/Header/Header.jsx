import React from 'react';
import { IoSettingsOutline, IoNotificationsOutline, IoMenu } from 'react-icons/io5';
import './Header.css';
import user from '../../../assets/user.png';

const Header = ({ setIsSidebarVisible, isSidebarVisible }) => {

    return (
        <nav className="navbar navbar-expand-lg bg-white p-1 header">
            <div className="container-fluid p-3 justify-content-center justify-content-sm-between">
                <div className='d-flex justify-content-center align-items-center gap-3'>
                    <IoMenu className='toggle' size={28} onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
                    <a className="navbar-brand title" href="#home">RS-TECH</a>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <IoSettingsOutline size={24} className="text-secondary" style={{ cursor: 'pointer' }} />
                    <IoNotificationsOutline size={24} className="text-secondary" style={{ cursor: 'pointer' }} />
                    <img src={user} alt="User Profile" className="rounded-circle border border-2 border-light-subtle user-profile" />
                </div>
            </div>
        </nav>
    );
};

export default Header;
