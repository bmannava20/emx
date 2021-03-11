import React from 'react';
import AppSubmenu from './AppSubmenu';

const AppMenu = (props) => {
    return (
        <div className="layout-sidebar" onClick={props.onMenuClick}>
            <div className="layout-menu-container">
                <AppSubmenu items={props.model} menuMode={props.menuMode} parentMenuItemActive menuActive={props.active} mobileMenuActive={props.mobileMenuActive} root onMenuitemClick={props.onMenuitemClick} onRootMenuitemClick={props.onRootMenuitemClick} />
            </div>
        </div>
    );
}

export default AppMenu;
