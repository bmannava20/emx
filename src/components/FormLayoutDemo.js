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
                        <h5 className="p-field p-col-12 p-md-11">{data && data.title}</h5>
                        <div className="p-field p-col-12 p-md-1">{!isEdit ? <Button label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button onClick={() => { setIsEdit(!isEdit) }} label="Save"></Button>}</div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname2">Title</label>
                            {!isEdit ? <label>&nbsp;:&nbsp;{data && data.title}</label> : <InputText id="firstname2" type="text" disabled={!isEdit} value={data && data.title} onChange={(e) => { console.log(e.target.value); setData({ ...data, title: e.target.value }) }} />}
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lastname2">Tag text/Names</label>
                            {!isEdit ? <label>&nbsp;:&nbsp;{data && data.tagText}</label> : <InputText id="firstname2" type="text" disabled={!isEdit} value={data && data.tagText} onChange={(e) => { console.log(e.target.value); setData({ ...data, tagText: e.target.value }) }} />}
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="videoLink">Video Link</label>
                            {/*<InputText id="videoLink" type="text" />*/}
                            {!isEdit ? <label>{data && data.resourceLink}</label> : <InputText id="firstname2" type="text" disabled={!isEdit} value={data && data.resourceLink} onChange={(e) => { console.log(e.target.value); setData({ ...data, resourceLink: e.target.value }) }} />}
                            {/* <FileUpload name="demo[]" disabled={!isEdit} url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /> */}
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Company ID's</label>
                            {!isEdit ? <label>&nbsp;:&nbsp;{data && data.company.companyId}</label> : <Dropdown id="state" value={dropdownItem} disabled={!isEdit} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>}
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="shortDesc">Short Description</label>
                            {!isEdit ? <label>&nbsp;:&nbsp;{data && data.shortDesc}</label> : <InputTextarea id="shortDesc" rows="4" disabled={!isEdit} value={data && data.shortDesc} onChange={(e) => { console.log(e.target.value); setData({ ...data, shortDesc: e.target.value }) }} />}
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="longDesc">Long Description</label>
                            {!isEdit ? <label>&nbsp;:&nbsp;{data && data.description}</label> : <InputTextarea id="longDesc" rows="4" disabled={!isEdit} value={data && data.description} onChange={(e) => { console.log(e.target.value); setData({ ...data, description: e.target.value }) }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
