import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import './MainLayout.css';

const MainLayout = () => {
    const sidebarWidth = 250;

    const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 600);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="main-layout-container">
            <Header setIsSidebarVisible={setIsSidebarVisible} isSidebarVisible={isSidebarVisible} />
            <div className="content-container">
                <Sidebar isSidebarVisible={isSidebarVisible} />
                <main
                    className="main-content"
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
