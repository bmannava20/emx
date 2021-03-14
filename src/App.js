import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

import AppTopBar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppNew from './AppNew';
import AppRightMenu from './AppRightMenu';
import AppTopMainBar from './TopBar';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import GetDataService from "./service/GetDataService";
import PrimeReact from 'primereact/utils';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import { useHistory } from "react-router-dom";

require('dotenv').config();


const App = () => {
    const history = useHistory();
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [menuList, setMenu] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [id,setId] = useState(null);

    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    useEffect(() => {
        console.log(history.location);
        if(history.location.pathname == "/"){
            localStorage.clear();
        }
    }, [history.location])

    useEffect(() => {
        const list = history.location.pathname.split('/');
        setId(list[list.length-1]);
    }, [history.location]);

    useEffect(()=>{
        const chapter = localStorage.getItem('chapter') ?  JSON.parse(localStorage.getItem('chapter')) : null;
        const section = localStorage.getItem('section') ? JSON.parse(localStorage.getItem('section')):null;
        const subSection = localStorage.getItem('subSection') ? JSON.parse(localStorage.getItem('subSection')):null;
        if(id && chapter && id == chapter.id){
            localStorage.setItem('curData',JSON.stringify(chapter));
        } else if(id && section && id == section.id){
            localStorage.setItem('curData',JSON.stringify(section));
        } else if(id && subSection && id == subSection.id){
            localStorage.setItem('curData',JSON.stringify(subSection));
        }
    },[history.location])


    const getLatestList = (list,id)=>{
        let flagParent = false;
        const items = list.map(item =>{
            if(item.items){
                const { items ,flag} = getLatestList(item.items,id,flagParent);
                item.items = items;
                flagParent = flag;
            }
            if(item.id == id){
                flagParent = true;
            }
            item.isOpen = flagParent;

            return item;
        })

        return {items,flag:flagParent}
    }

    useEffect(() => {
        const getDataService = new GetDataService(process.env.TRAINING_APP_BASE_URL);
        getDataService.getSidebarData('JOR').then((data) => {
            setCompanyData(data.companies);
            return data;
        }).then(data=>{
            const {items,flag} = getLatestList(data.contents,id);
            setMenu(items);
        }).catch((err)=>{
            console.log('err >>',err)
        });
    }, [id]);

    const menu = [
        {
            /*label: "Hierarchy", icon: "pi pi-fw pi-align-left",*/
            items: menuList
        },
    ];

    const routers = [
        { path: '/formlayout/:id', component: FormLayoutDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }] } }
    ];

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
        }
        else {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme('layout-sidebar-' + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
    };

    const onColorSchemeChange = (e) => {
        setColorScheme(e.value);
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive(prevTopbarUserMenuActive => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive(prevTopbarNotificationMenuActive => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive(prevSearchActive => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = !searchClick;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive(prevRightMenuActive => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isOverlay = () => {
        return menuMode === "overlay";
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-overlay': menuMode === "overlay",
            'layout-static': menuMode === "static",
            'layout-slim': menuMode === "slim",
            'layout-sidebar-dim': colorScheme === "dim",
            'layout-sidebar-dark': colorScheme === "dark",
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === "static",
            'p-input-filled': inputStyle === "filled",
            'p-ripple-disabled': !ripple,
        },
        colorScheme === 'light' ? menuTheme : '');

    return (
        <div>
            <div className="header sticky">
                <AppTopMainBar />
            </div>
            <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
                <div className="layout-content-wrapper mt-4">
                    <AppTopBar routers={routers} topbarNotificationMenuActive={topbarNotificationMenuActive} topbarUserMenuActive={topbarUserMenuActive} onMenuButtonClick={onMenuButtonClick} onSearchClick={toggleSearch}
                        onTopbarNotification={onTopbarNotificationMenuButtonClick} onTopbarUserMenu={onTopbarUserMenuButtonClick} onRightMenuClick={onRightMenuButtonClick} onRightMenuButtonClick={onRightMenuButtonClick}></AppTopBar>

                    <div className="layout-content">
                        {
                            routers.map((router, index) => {
                                if (router.exact) {
                                    return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                                }
                                return <Route key={`router${index}`} path={router.path} component={router.component} />
                            })
                        }
                    </div>
                    <AppFooter />
                </div>

                {menu && <AppMenu model={menu} menuMode={menuMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} onMenuClick={onMenuClick} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick}></AppMenu>}
                <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

                <AppConfig configActive={configActive} menuMode={menuMode} onMenuModeChange={onMenuModeChange} menuTheme={menuTheme} onMenuThemeChange={onMenuThemeChange}
                    colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} onConfigClick={onConfigClick} onConfigButtonClick={onConfigButtonClick}
                    rippleActive={ripple} onRippleChange={onRippleChange} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}></AppConfig>

                <AppNew companyData={companyData} searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide}  />

                <div className="layout-mask modal-in"></div>
            </div>
        </div>
    );
}

export default App;
