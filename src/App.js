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
import CustomerService from './service/CustomerService';
import PrimeReact from 'primereact/utils';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {

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
    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    useEffect(() => {
        const customerService = new CustomerService();
        customerService.getSidebar().then(data => setMenu(data.items));
    }, []);

    const menu = [
        /*{
            label: "Favorites", icon: "pi pi-fw pi-home",
            items: [
                { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }
            ]
        },
        { separator: true },
        {
            label: "UI Kit", icon: "pi pi-fw pi-id-card",
            items: [
                { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/formlayout" },
                { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" }
            ]
        },
        { separator: true },
        {
            label: "Utilities", icon: "pi pi-fw pi-desktop",
            items: [
                { label: "Display", icon: "pi pi-fw pi-desktop", to: "/display" },
                { label: "Elevation", icon: "pi pi-fw pi-external-link", to: "/elevation" },
                { label: "Flexbox", icon: "pi pi-fw pi-directions", to: "/flexbox" },
                { label: "Icons", icon: "pi pi-fw pi-search", to: "/icons" },
                { label: "Text", icon: "pi pi-fw pi-pencil", to: "/text" },
                { label: "Widgets", icon: "pi pi-fw pi-star-o", to: "/widgets" },
                { label: "Grid System", icon: "pi pi-fw pi-th-large", to: "/grid" },
                { label: "Spacing", icon: "pi pi-fw pi-arrow-right", to: "/spacing" },
                { label: "Typography", icon: "pi pi-fw pi-align-center", to: "/typography" }
            ]
        },
        { separator: true },
        {
            label: "Pages", icon: "pi pi-fw pi-pencil",
            items: [
                { label: "Crud", icon: "pi pi-fw pi-pencil", to: "/crud" },
                { label: "Calendar", icon: "pi pi-fw pi-calendar-plus", to: "/calendar" },
                { label: "Landing", icon: "pi pi-fw pi-user-plus", url: "assets/pages/landing.html", target: "_blank" },
                { label: "Login", icon: "pi pi-fw pi-sign-in", to: "/login" },
                { label: "Invoice", icon: "pi pi-fw pi-dollar", to: "/invoice" },
                { label: "Help", icon: "pi pi-fw pi-question-circle", to: "/help" },
                { label: "Error", icon: "pi pi-fw pi-times-circle", to: "/error" },
                { label: "Not Found", icon: "pi pi-fw pi-exclamation-circle", to: "/notfound" },
                { label: "Access Denied", icon: "pi pi-fw pi-lock", to: "/access" },
                { label: "Empty", icon: "pi pi-fw pi-circle-off", to: "/empty" }
            ]
        },
        { separator: true },*/
        // {
        //     /*label: "Hierarchy", icon: "pi pi-fw pi-align-left",*/
        //     items: [
        //         {
        //             label: "Submenu 1", icon: "pi pi-fw pi-align-left",
        //             items: [
        //                 {
        //                     label: "Submenu 1.1", icon: "pi pi-fw pi-align-left",
        //                     items: [
        //                         { label: "Submenu 1.1.1", icon: "pi pi-fw pi-align-left", to: "/file" },
        //                         { label: "Submenu 1.1.2", icon: "pi pi-fw pi-align-left", to: "/file" },
        //                         { label: "Submenu 1.1.3", icon: "pi pi-fw pi-align-left", to: "/invoice" }
        //                     ]
        //                 },
        //                 {
        //                     label: "Submenu 1.2", icon: "pi pi-fw pi-align-left", to: "/crud",
        //                     items: [
        //                         { label: "Submenu 1.2.1", icon: "pi pi-fw pi-align-left", to: "/grid" }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             label: "Submenu 2", icon: "pi pi-fw pi-align-left", to: "/widgets",
        //             items: [
        //                 {
        //                     label: "Submenu 2.1", icon: "pi pi-fw pi-align-left", to: "/elevation",
        //                     items: [
        //                         { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left", to: "/table", },
        //                         { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left", to: "/button", },
        //                     ],
        //                 },
        //                 {
        //                     label: "Submenu 2.2", icon: "pi pi-fw pi-align-left", to: "/formlayout",
        //                     items: [
        //                         { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left", to: "/widgets", },
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            /*label: "Hierarchy", icon: "pi pi-fw pi-align-left",*/
            items: menuList
        },
        /*{ separator: true },
        {
            label: "Start", icon: "pi pi-fw pi-download",
            items: [
                { label: "Buy Now", icon: "pi pi-fw pi-shopping-cart", command: () => window.open("https://www.primefaces.org/store", "_blank") },
                { label: "Documentation", icon: "pi pi-fw pi-info-circle", to: "/documentation" },
            ]
        }*/
    ];

    const routers = [
        /*{ path: '/', component: Dashboard, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }] } },*/
        { path: '/formlayout/:id', component: FormLayoutDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }] } },
        /*{ path: '/input', component: InputDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Input' }] } },
        { path: '/floatlabel', component: FloatLabelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }] } },
        { path: '/button', component: ButtonDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Button' }] } },
        { path: '/table', component: TableDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Table' }] } },
        { path: '/list', component: ListDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'List' }] } },
        { path: '/tree', component: TreeDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }] } },
        { path: '/panel', component: PanelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }] } },
        { path: '/overlay', component: OverlayDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }] } },
        { path: '/media', component: MediaDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Media' }] } },
        { path: '/menu', component: MenuDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/messages', component: MessagesDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }] } },
        { path: '/file', component: FileDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'File' }] } },
        { path: '/chart', component: ChartDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }] } },
        { path: '/misc', component: MiscDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }] } },
        { path: '/icons', component: IconsDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Icons' }] } },
        { path: '/widgets', component: Widgets, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Widgets' }] } },
        { path: '/grid', component: GridDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Grid System' }] } },
        { path: '/spacing', component: SpacingDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Spacing' }] } },
        { path: '/elevation', component: ElevationDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Elevation' }] } },
        { path: '/typography', component: TypographyDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Typography' }] } },
        { path: '/display', component: DisplayDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Display' }] } },
        { path: '/flexbox', component: FlexBoxDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Flexbox' }] } },
        { path: '/text', component: TextDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Text' }] } },
        { path: '/crud', component: CrudDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Crud' }] } },
        { path: '/calendar', component: CalendarDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Calendar' }] } },
        { path: '/invoice', component: Invoice, meta: { breadcrumb: [{ parent: 'Pages', label: 'Invoice' }] } },
        { path: '/help', component: Help, meta: { breadcrumb: [{ parent: 'Pages', label: 'Help' }] } },
        { path: '/empty', component: EmptyPage, meta: { breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }] } },
        { path: '/documentation', component: Documentation, meta: { breadcrumb: [{ parent: 'Pages', label: 'Documentation' }] } }*/
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

                <AppNew searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />

                <div className="layout-mask modal-in"></div>
            </div>
        </div>
    );
}

export default App;
