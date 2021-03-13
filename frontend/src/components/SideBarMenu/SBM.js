import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Ai from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { GoogleLogout } from 'react-google-login';
import { Redirect, withRouter } from 'react-router-dom';
import './SBM.css';
let credentials = require('../../config/google-credentials.json');
let userService = require('../../Services/UserService');

// TODO: filter menu elements according to admin/examinee

const SideMenu = props => {
    const [sidebarShow, setSideBarShow] = useState(false);
    console.log(props);

    const handleSidebarVisibility = () => setSideBarShow(!sidebarShow);

    const logout = res => {
        userService.emptyLocalStorage();
        props.history.push('/');
    };

    return (
        <>
            <div className="sidemenu">
                <Link to="#" className="menu-bars">
                    <Ai.AiOutlineMenu onClick={handleSidebarVisibility} />
                </Link>
            </div>
            <nav className={sidebarShow ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <Ai.AiOutlineClose
                                onClick={handleSidebarVisibility}
                            />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.colName}>
                                <Link
                                    to={item.path}
                                    onClick={handleSidebarVisibility}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li className="navbar-toggle">
                        <GoogleLogout
                            clientId={credentials.clientID}
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                            signOut={true}
                            className="google-logout"
                        ></GoogleLogout>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default withRouter(SideMenu);
