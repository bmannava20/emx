import React from 'react';
import { Link } from 'react-router-dom';

const AppTopMainBar = (props) => {
    return (
        <div id="background-blue" className="layout-topbar ">
            <div className="topbar-left">
                <Link to="/" className="logo">
                    <img id="app-logo" height={50} className="logo-image" src="assets/layout/images/emx.png"/>
                </Link>
            </div>
        </div>
    );
}

export default AppTopMainBar;
