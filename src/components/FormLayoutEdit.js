import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { useHistory } from 'react-router-dom';
import CustomerService from '../service/CustomerService';

export const FormLayoutEdit = (props) => {
    const history = useHistory();
    const toast = useRef(null);
    const [dropdownItem, setDropdownItem] = useState("");
    const [data, setData] = useState(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    useEffect(() => {
        setData(props.data)
    }, [props])

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label>Title</label></div>
                        <div className="p-field p-col-7">  <InputText className={"form-input-ctrl required-field form-control"} id="tittle" type="text" value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} /></div>

                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"> <label htmlFor="companyID">Company ID's</label></div>
                            <div className="p-field p-col-7"><Dropdown id="companyID" className={"form-input-ctrl required-field form-control"} value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={data && data.chapters} optionLabel="title" placeholder="Select One"></Dropdown></div>

                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"><label htmlFor="shortDesc">Short Description</label> </div>
                            <div className="p-field p-col-7"><InputTextarea id="shortDesc" rows="4" className={"form-control required-field"} value={data && data.shortDesc} onChange={(e) => { console.log(e.target.value); setData({ ...data, shortDesc: e.target.value }) }} /></div>

                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"><label htmlFor="videoLink">Video Link</label></div>
                            <div className="p-field p-col-7">    <FileUpload name="demo[]" url="./upload.php" emptyTemplate={<div>{data && data.resourceLink}</div>} onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label htmlFor="tagText">Tag text/Names</label></div>
                        <div className="p-field p-col-7"> <InputTextarea rows="5.5" id="tagText" type="text" className={"form-control"} value={data && data.tagText} onChange={(e) => { console.log(e.target.value); setData({ ...data, tagText: e.target.value }) }} /></div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid ">
                        <div className="p-field p-col-2 center"><label htmlFor="longDesc">Long Description</label></div>
                        <div className="p-field p-col-7"><InputTextarea id="longDesc" rows="8" className={"form-control"} value={data && data.description} onChange={(e) => { console.log(e.target.value); setData({ ...data, description: e.target.value }) }} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
