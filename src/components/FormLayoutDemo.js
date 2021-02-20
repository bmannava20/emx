import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { useHistory } from 'react-router-dom';
import CustomerService from '../service/CustomerService';
import { FormLayoutEdit } from './FormLayoutEdit';
import { FormLayoutView } from './FormLayoutView';

export const FormLayoutDemo = () => {
    const history = useHistory();
    const toast = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    useEffect(() => {
        const customerService = new CustomerService();
        customerService.getSection().then(data => { setData(data) });
    }, [history.location.state]);



    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-11">{data && data.title} ({data && data.company && data.company.companyId})</h5>
                        <div className="p-field p-col-12 p-md-1">{!isEdit ? <Button id="action" label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button id="action" onClick={() => { setIsEdit(!isEdit) }} label="Cancel"></Button>}</div>
                    </div>
                    {isEdit ? <FormLayoutEdit data={data} /> : <FormLayoutView data={data} />}
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field  p-col-9"></div>
                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="action" label="Reset"></Button>}
                        </div>

                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="action" label="Cancel"></Button>}
                        </div>
                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="action" label="Submit"></Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
