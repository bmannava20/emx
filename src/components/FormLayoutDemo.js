import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { useHistory } from 'react-router-dom';

export const FormLayoutDemo = () => {
    const history = useHistory();
    const toast = useRef(null);
    const [dropdownItem, setDropdownItem] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(null);
    const dropdownItems = [
        { name: "chapter1", code: "chapter1" },
        { name: 'chapter2', code: 'chapter2' },
        { name: 'chapter3', code: 'chapter3' }
    ];

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }


    useEffect(() => {
        console.log(history.location.state);
        setData(history.location.state)
    }, [history.location.state])

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-11">{data && data.title} ({data && data.company.companyId})</h5>
                        <div className="p-field p-col-12 p-md-1">{!isEdit ? <Button label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button onClick={() => { setIsEdit(!isEdit) }} label="Save"></Button>}</div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">

                            {!isEdit ? "" : (<div><label>Title</label><InputText className={"form-input-ctrl undefined required-field form-control"}  id="tittle" type="text" disabled={!isEdit} value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} /></div>)}
                            {/*{!isEdit ? <label>&nbsp;:&nbsp;{data && data.title}0000000</label> : <InputText className={"form-input-ctrl undefined required-field form-control"}  id="tittle" type="text" disabled={!isEdit} value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} />}*/}
                        </div>
                        <div className="p-field p-col-12 p-md-6">

                            {!isEdit ? "" :  (<div><label htmlFor="tagText">Tag text/Names</label> <InputText id="tagText" type="text" disabled={!isEdit} value={data && data.tagText} onChange={(e) => { console.log(e.target.value); setData({ ...data, tagText: e.target.value }) }} /></div>)}
                        </div>
                        {/*<div className="p-field p-col-12 p-md-6">
                            <label htmlFor="videoLink">Video Link</label>
                            <InputText id="videoLink" type="text" />
                            {!isEdit ? <label>{data && data.resourceLink}</label> : <InputText id="videoLink" type="text" disabled={!isEdit} value={data && data.resourceLink} onChange={(e) => { console.log(e.target.value); setData({ ...data, resourceLink: e.target.value }) }} />}
                             <FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>*/}
                        <div className="p-field p-col-12 p-md-3">
                            {!isEdit ? "" : (<div> <label htmlFor="companyID">Company ID's</label> <Dropdown id="companyID" value={dropdownItem} disabled={!isEdit} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown></div>)}
                        </div>
                        <div className="p-field p-col-12">
                            {!isEdit ? <label>{data && data.shortDesc}</label> : (<div>  <label htmlFor="shortDesc">Short Description</label> <InputTextarea id="shortDesc" rows="4" disabled={!isEdit} value={data && data.shortDesc} onChange={(e) => { console.log(e.target.value); setData({ ...data, shortDesc: e.target.value }) }} /></div>)}
                        </div>
                        <div className="p-field p-col-12">

                            {!isEdit ? <label>{data && data.description}</label> : (<div><label htmlFor="longDesc">Long Description</label> <InputTextarea id="longDesc" rows="4" disabled={!isEdit} value={data && data.description} onChange={(e) => { console.log(e.target.value); setData({ ...data, description: e.target.value }) }} /></div>)}
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            {!isEdit ? <video width="320" height="240" controls>
                                {/* <source src="{data && data.resourceLink}" type="video/mp4">
                                <source src="{data && data.resourceLink}" type="video/ogg">*/}
                            </video> : (<div><label>{data && data.resourceLink}</label><label htmlFor="videoLink">Video Link</label><FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>)}
                            {/* <FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /> */}

                        </div>
                        <div>

                        </div>
                        {!isEdit ? "" : <Button label="Submit" className="p-mr-2 p-mb-2"></Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
