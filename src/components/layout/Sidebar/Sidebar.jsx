import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsGridFill, BsFillPersonFill, BsCalendar3, BsChatLeftText } from 'react-icons/bs';
import './Sidebar.css';

const Sidebar = ({ isSidebarVisible }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: BsGridFill },
        { name: 'Employee', path: '/employees', icon: BsFillPersonFill },
        { name: 'Calendar', path: '/calendar', icon: BsCalendar3 },
        { name: 'Messages', path: '/messages', icon: BsChatLeftText },
    ];

    return (
        <div className={`sidebar-container ${!isSidebarVisible ? 'hidden' : ''}`}>
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`sidebar-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                >
                    <item.icon className="sidebar-icon" />
                    <span className="sidebar-text">{item.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;