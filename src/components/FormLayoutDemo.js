import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { useHistory } from 'react-router-dom';
import CustomerService from '../service/CustomerService';

export const FormLayoutDemo = () => {
    const history = useHistory();
    const toast = useRef(null);
    const [dropdownItem, setDropdownItem] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    useEffect(() => {
        const customerService = new CustomerService();
        customerService.getSection().then(data => { setData(data) });
    }, [history.location.state]);


    useEffect(() => {
        setDropdownItem(data && data.chapter)
    }, [data])

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-11">{data && data.title} ({data && data.company && data.company.companyId})</h5>
                        <div className="p-field p-col-12 p-md-1">{!isEdit ? <Button  id="action" label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button  id="action" onClick={() => { setIsEdit(!isEdit) }} label="Cancel"></Button>}</div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">

                            {!isEdit ? "" : (<div><label>Title</label><InputText className={"form-input-ctrl required-field form-control"} id="tittle" type="text" disabled={!isEdit} value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} /></div>)}
                            {/*{!isEdit ? <label>&nbsp;:&nbsp;{data && data.title}0000000</label> : <InputText className={"form-input-ctrl undefined required-field form-control"}  id="tittle" type="text" disabled={!isEdit} value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} />}*/}
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            {!isEdit ? "" : (<div> <label htmlFor="companyID">Company ID's</label>
                                <Dropdown id="companyID" className={"form-input-ctrl required-field form-control drpdownwidth"} value={dropdownItem} disabled={!isEdit} onChange={(e) => setDropdownItem(e.value)} options={data && data.chapters} optionLabel="title" placeholder="Select One"></Dropdown></div>)}
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            {!isEdit ? <label>{data && data.shortDesc}</label> : (<div>  <label htmlFor="shortDesc">Short Description</label> <InputTextarea id="shortDesc" rows="4" className={"form-control required-field"} disabled={!isEdit} value={data && data.shortDesc} onChange={(e) => { console.log(e.target.value); setData({ ...data, shortDesc: e.target.value }) }} /></div>)}
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            {!isEdit ? <video width="520" height="520" controls>
                                {/* <source  src={data && data.resourceLink} type="video/youtube" ></source> */}
                                <source src="/assets/video/videoplayback.mp4" type="video/mp4"></source>
                                <source src="/assets/video/videoplayback.mp4" type="video/ogg"></source>
                                Your browser does not support the video tag.
                            </video> : (<div><label htmlFor="videoLink">Video Link</label><FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" emptyTemplate={<div>{data && data.resourceLink}</div>} onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>)}
                            {/* <FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /> */}

                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">

                            {!isEdit ? "" : (<div><label htmlFor="tagText">Tag text/Names</label> <InputTextarea rows="5.5" id="tagText" type="text" className={"form-control"} disabled={!isEdit} value={data && data.tagText} onChange={(e) => { console.log(e.target.value); setData({ ...data, tagText: e.target.value }) }} /></div>)}
                        </div>
                        <div className="p-field p-col-12">

                            {!isEdit ? <label>{data && data.description}</label> : (<div><label htmlFor="longDesc">Long Description</label> <InputTextarea id="longDesc" rows="8" className={"form-control"} disabled={!isEdit} value={data && data.description} onChange={(e) => { console.log(e.target.value); setData({ ...data, description: e.target.value }) }} /></div>)}
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field  p-col-9"></div>
                            <div className=" p-col-1 ">
                                {!isEdit ? "" : <Button  id="action" label="Reset"></Button>}
                            </div>

                            <div className=" p-col-1 ">
                                {!isEdit ? "" : <Button  id="action" label="Cancel"></Button>}
                            </div>
                            <div className=" p-col-1 ">
                                {!isEdit ? "" : <Button  id="action" label="Submit"></Button>}
                            </div>
                        </div>
                    </div>
                </div>
             </div>

    )
}
