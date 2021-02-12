import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import classNames from 'classnames';
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const AppNew = (props) => {
    const [onSelect, setOnSelect] = useState(null)
    let searchInputEl = null;
    function setValue(e) {
        setOnSelect(e);
        console.log(e, "select");
    }
    const toast = useRef(null);

    const onEnter = () => {
        if (searchInputEl) {
            searchInputEl.focus();
        }
    };

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    const outerClass = classNames('p-fluid p-formgrid p-grid')

    const innerClass = classNames('p-field p-col-12 p-md-11')

    const SubSectionContent = <div>

            <div>
                <div><label> Title </label></div>
                <div><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }}/></div>
            </div>

            <div>
                <div><label> Short description </label></div>
                <div><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }}/></div>
            </div>
            <div>
                <div><label> Tagtext </label></div>
                <div><InputText className={"form-input-ctrl form-control"} onChange={(e) => { console.log(e.target.value); }}/></div>
            </div>
            <div>
                <div><label> Company IDs </label></div>
                <div><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
            </div>
            {(onSelect === "Section" || onSelect === "SubSection") && <div>
                <div><label> Chapter </label></div>
                <div><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
            </div>}
            {onSelect === "SubSection" && <div>
                <div><label> Section </label></div>
                <div><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
            </div>}
            <div>
                <div><label> Video </label></div>
                <div><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>
            </div>

            <div>
                <div><label> Long description </label></div>
                <div><InputText className={"form-input-ctrl form-control"} onChange={(e) => { console.log(e.target.value); }} /></div>
            </div>

            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-4 p-md-4 p-lg-6"></div>
                <div className="p-field p-col-4 p-md-4 p-lg-3">
                    <Button label="Submit"></Button>
                </div>
                <div className="p-field p-col-4 p-md-4 p-lg-3">
                    <Button label="Cancel"></Button>
                </div>
            </div>
    </div>


    const getContent = () => {
        switch (onSelect) {
            case "Chapter":
                return SubSectionContent
            case "Section":
                return SubSectionContent
            case "SubSection":
                return SubSectionContent
            default:
                return ""
        }
    }

    return (
        <div className="layout-search">
            <CSSTransition className="search-container" timeout={{ enter: 400, exit: 400 }} in={props.searchActive} unmountOnExit onEnter={onEnter}>
                <div onClick={props.onSearchClick}>
                    <div className={outerClass}>
                        <div className={innerClass} style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <RadioButton value="Chapter" name="chapter" onChange={(e) => setValue(e.value)} />&nbsp;Chapter&nbsp;
                            <RadioButton value="Section" name="section" onChange={(e) => setValue(e.value)} />&nbsp;Section&nbsp;
                            <RadioButton value="SubSection" name="subsection" onChange={(e) => setValue(e.value)} />&nbsp;SubSection&nbsp;
                        </div>
                        <div className={innerClass}>
                            {getContent()}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div >
    );
}

export default AppNew;
