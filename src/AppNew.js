import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import classNames from 'classnames';
import {InputTextarea} from "primereact/inputtextarea";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
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

    const ChapaterContent = (<div>

       <table>
           <tbody>
           <tr>
            <td><label> Title </label></td>
            <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
           </tr>

           <tr>
               <td><label> Short description </label></td>
               <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
           </tr>
           <tr>
               <td><label> Tagtext </label></td>
               <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
           </tr>
           <tr>
               <td><label> Company IDs </label></td>
               <td><Dropdown  className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
           </tr>

           <tr>
               <td><label> Video </label></td>
               <td><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></td>
           </tr>

           <tr>
               <td><label> Long description </label></td>
               <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
           </tr>
           <tr>
               <td><label></label></td>
               <td>
                   <Button label="Reset"></Button>
                   <Button label="Submit"></Button>
               </td>
           </tr>
           </tbody>
       </table>

    </div>)

    const SectionContent = <div>
        {/*<table><tbody>
            <tr>
                <td><label> Title </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>

            <tr>
                <td><label> Short description </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label> Tagtext </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label> Company IDs </label></td>
                <td><Dropdown className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
            </tr>
            <tr>
                <td><label> Chapter </label></td>
                <td><Dropdown className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
            </tr>
            <tr>
                <td><label> Video </label></td>
                <td><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></td>
            </tr>

            <tr>
                <td><label> Long description </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label></label></td>
                <td>
                    <Button label="Submit"></Button>
                </td>
            </tr></tbody>
        </table>*/}
    </div>

    const SubSectionContent = <div>
        {/*<table><tbody>
            <tr>
                <td><label> Title </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>

            <tr>
                <td><label> Short description </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label> Tagtext </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label> Company IDs </label></td>
                <td><Dropdown className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
            </tr>
            <tr>
                <td><label> Chapter </label></td>
                <td><Dropdown  className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
            </tr>
            <tr>
                <td><label> Section </label></td>
                <td><Dropdown className={"form-input-ctrl required-field form-control"}  optionLabel="name" placeholder="Select One"></Dropdown></td>
            </tr>
            <tr>
                <td><label> Video </label></td>
                <td><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></td>
            </tr>

            <tr>
                <td><label> Long description </label></td>
                <td><InputText className={"form-input-ctrl required-field form-control"} onChange={(e) => { console.log(e.target.value); }} class /></td>
            </tr>
            <tr>
                <td><label></label></td>
                <td>
                    <Button label="Submit"></Button>
                </td>
            </tr></tbody>
        </table>*/}
    </div>


    const getContent = () => {
        switch (onSelect) {
            case "Chapter":
                return ChapaterContent
            case "Section":
                return SectionContent
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
