import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import classNames from 'classnames';
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const AppNew = (props) => {
    const [onSelect, setOnSelect] = useState("Chapter")
    let searchInputEl = null;
    function setValue(e) {
        setOnSelect(e);
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

    const innerClass = classNames('p-field p-col-12')

    const SubSectionContent = <div className="p-fluid p-formgrid p-grid addnew fill-width">
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> {onSelect} </label></div>
            <div className="p-field p-col-10"><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} /></div>
        </div>
        {(onSelect === "Section" || onSelect === "SubSection") && <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Chapter </label></div>
            <div className="p-field p-col-10"><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
        </div>}
        {onSelect === "SubSection" && <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Section </label></div>
            <div className="p-field p-col-10"><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
        </div>}
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Short description </label></div>
            <div className="p-field p-col-10"><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Company IDs </label></div>
            <div className="p-field p-col-10"><Dropdown className={"form-input-ctrl required-field form-control"} optionLabel="name" placeholder="Select One"></Dropdown></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Tagtext </label></div>
            <div className="p-field p-col-10"><InputText className={"form-input-ctrl form-control"} onChange={(e) => { console.log(e.target.value); }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Video </label></div>
            <div className="p-field p-col-10"><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-2"><label> Long description </label></div>
            <div className="p-field p-col-10"><InputText className={"form-input-ctrl form-control"} onChange={(e) => { console.log(e.target.value); }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-4 p-md-4 p-lg-6"></div>
            <div className="p-field p-col-4 p-md-4 p-lg-3">
                <Button label="Submit"></Button>
            </div>
            <div className="p-field p-col-4 p-md-4 p-lg-3">
                <Button label="Cancel" onClick={props.onSearchClick}></Button>
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
                        <div className="p-fluid p-formgrid p-grid center-radio">
                            <div className='center' onClick={() => setValue('Chapter')} ><RadioButton value="Chapter" checked={onSelect === 'Chapter'} name="chapter" />&nbsp;Chapter&nbsp;</div>
                            <div className='center' onClick={() => setValue('Section')}>
                                <RadioButton value="Section" checked={onSelect === 'Section'} name="section" onChange={(e) => setValue(e.value)} />&nbsp;Section&nbsp;
                            </div>
                            <div className='center' onClick={() => setValue('SubSection')}>
                                <RadioButton value="SubSection" checked={onSelect === 'SubSection'} name="subsection" onChange={(e) => setValue(e.value)} />&nbsp;SubSection&nbsp;
                            </div>
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
