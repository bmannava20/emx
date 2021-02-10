import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
const AppSearch = (props) => {

    let searchInputEl = null;
    function setValue(e){

    }

    const onInputKeydown = (event) => {
        const key = event.which;

        //escape, tab and enter
        if (key === 27 || key === 9 || key === 13) {
            props.onSearchHide(event);
        }
    };

    const onEnter = () => {
        if (searchInputEl) {
            searchInputEl.focus();
        }
    };

    return (
        <div className="layout-search">
            <CSSTransition classNames="search-container" timeout={{ enter: 400, exit: 400 }} in={props.searchActive} unmountOnExit onEnter={onEnter}>
                <div className="search-container" onClick={props.onSearchClick}>

                    <RadioButton value="val1" name="chapter" onChange={(e) => setValue(e.value)}  /> &nbsp;&nbsp;Chapter &nbsp;&nbsp;&nbsp;
                    <RadioButton value="val2" name="section" onChange={(e) => setValue(e.value)}  /> &nbsp;&nbsp;Section &nbsp;&nbsp;&nbsp;
                    <RadioButton value="val2" name="subsection" onChange={(e) => setValue(e.value)}  /> &nbsp;&nbsp; SubSection

                </div>
            </CSSTransition>
        </div>
    );
}

export default AppSearch;
