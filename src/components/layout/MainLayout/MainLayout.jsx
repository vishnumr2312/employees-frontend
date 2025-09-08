import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import './MainLayout.css';

const MainLayout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const sidebarWidth = 250;

    return (
        <div className="main-layout-container">
            <Header setIsSidebarVisible={setIsSidebarVisible} isSidebarVisible={isSidebarVisible} />
            <div className="content-container">
                <Sidebar isSidebarVisible={isSidebarVisible} />
                <main
                    className="main-content border"
                    style={{
                        marginLeft: isSidebarVisible ? '0px' : `-${sidebarWidth}px`,
                        width: isSidebarVisible ? `calc(100% - ${sidebarWidth}px)` : '100%'
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;