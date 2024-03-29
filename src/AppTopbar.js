import React from 'react';
import AppBreadcrumb from './AppBreadcrumb';
import {BreadCrumb} from "primereact/breadcrumb";

const AppTopbar = (props) => {
    let items = [];
    if(localStorage.getItem('chapter')){
        items = [
            { label: JSON.parse(localStorage.getItem('chapter')).title,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('chapter')).id}` },
        ];
    }
    if(localStorage.getItem('section')){
        items = [
            { label: JSON.parse(localStorage.getItem('chapter')).title,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('chapter')).id}` },
            { label: JSON.parse(localStorage.getItem('section')).title,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('section')).id}` },
        ];
    }
    if(localStorage.getItem('subSection')){
        items = [
            { label: JSON.parse(localStorage.getItem('chapter')).title ,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('chapter')).id}`},
            { label: JSON.parse(localStorage.getItem('section')).title ,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('section')).id}`},
            { label: JSON.parse(localStorage.getItem('subSection')).title ,url:`${process.env.REACT_APP_BASE_URL}/#/formlayout/${JSON.parse(localStorage.getItem('subSection')).id}`},
        ];
    }
    const home = { icon: 'pi pi-home', url: '' }
    return (
        <div className="layout-topbar">
            <div className="topbar-left">
                 <button type="button" className="menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-chevron-left"></i>
                    </button>
                <span className="topbar-separator"></span>
                <BreadCrumb model={items} home={home}/>
                   {/* <div className="layout-breadcrumb viewname" >
                        <AppBreadcrumb routers={props.routers} />

                    </div>

                <img id="logo-mobile" className="mobile-logo" src="assets/layout/images/logo-dark.svg" alt="diamond-layout" />*/}
            </div>

            <div className="topbar-right">
                <button type="button" className="p-link" onClick={props.onSearchClick}>
                    <i className="pi pi-plus"></i>  Add New
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/*<ul className="topbar-menu">
                    <li className="search-item">
                        <button type="button" className="p-link" onClick={props.onSearchClick}>
                            <i className="pi pi-search"></i>
                        </button>
                    </li>
                    <li className={notificationsItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarNotification}>
                            <i className="pi pi-bell"></i>
                            <span className="topbar-badge">5</span>
                        </button>
                        <ul className="notifications-menu fade-in-up">
                            <li role="menuitem">
                                <button type="button" className="p-link" tabIndex="0">
                                    <i className="pi pi-shopping-cart"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">New Order</div>
                                        <div className="notification-detail">You have <strong>3</strong> new orders.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-check-square"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Withdrawn Completed</div>
                                        <div className="notification-detail">Funds are on their way.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-chart-line"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Monthly Reports</div>
                                        <div className="notification-detail">New reports are ready.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-comments"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Comments</div>
                                        <div className="notification-detail"><strong>2</strong> new comments.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-exclamation-circle"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Chargeback Request</div>
                                        <div className="notification-detail"><strong>1</strong> to review.</div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className={profileItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarUserMenu}>
                            <img src="assets/demo/images/avatar/profile.jpg" alt="diamond-layout" className="profile-image" />
                            <span className="profile-name">Amelia Stone</span>
                        </button>
                        <ul className="profile-menu fade-in-up">
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-user"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-cog"></i>
                                    <span>Settings</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-calendar"></i>
                                    <span>Calendar</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-inbox"></i>
                                    <span>Inbox</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-power-off"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className="right-sidebar-item">
                        <button type="button" className="p-link" onClick={props.onRightMenuButtonClick}>
                            <i className="pi pi-align-right"></i>
                        </button>
                    </li>
                </ul>*/}
            </div>
        </div>
    );
}

export default AppTopbar;
