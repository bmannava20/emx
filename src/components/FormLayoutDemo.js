import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import CustomerService from '../service/CustomerService';
import { FormLayoutEdit } from './FormLayoutEdit';
import { FormLayoutView } from './FormLayoutView';
import GetDataService from "../service/GetDataService";
import UpdateDataService from "../service/UpdateDataService";
import { Dialog } from 'primereact/dialog';

export const FormLayoutDemo = () => {
    const history = useHistory();
    const toast = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(null);
    const [displayConfirmation,setDisplayConfirmation] = useState(false);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }


    useEffect(() => {
        const curData = history.location.state;
        const getDataService = new GetDataService();
        if(curData && curData.typeIdentifier === 'CHAPTER'){
            getDataService.retrieveChapter(curData.id).then(data => { setData(data) });
        }
        if(curData && curData.typeIdentifier === 'SECTION'){
            getDataService.retrieveSection(curData.id).then(data => { setData(data) });
        }
        if(curData && curData.typeIdentifier === 'SUBSECTION'){
            getDataService.retrieveSubsection(curData.id).then(data => { setData(data) });
        }
    }, [history.location.state]);


    useEffect(()=>{
      console.log(data);
    },[data])


    const onDelete = ()=>{
            const getDataService = new GetDataService();

            if(data && data.typeIdentifier === 'CHAPTER'){
                getDataService.deleteChapter(data.id).then(data => {console.log("chapter",data); history.go(0); });
            }
            if(data && data.typeIdentifier === 'SECTION'){
                getDataService.deleteSection(data.id).then(data => {console.log("section",data); history.go(0)  });
            }
            if(data && data.typeIdentifier === 'SUBSECTION'){
                getDataService.deleteSubsection(data.id).then(data => {console.log("subsection",data);history.go(0)  });
            }

    }
    const submitEditFormData = (data) =>{
        console.log(data);
        const {id,chapter, title,tagtext,shortDesc,resourceLink,description,company,section} = data;
        const updateDataService = new UpdateDataService();

        if(data && data.typeIdentifier === 'CHAPTER'){
            updateDataService.updateChapterData({id,title,tagtext,shortDesc,resourceLink,description,company}).then(res => {   });
        }
        if(data && data.typeIdentifier === 'SECTION'){
            updateDataService.updateSectionData({id,title,tagtext,shortDesc,resourceLink,description,company, chapter}).then(data => {   });
        }
        if(data && data.typeIdentifier === 'SUBSECTION'){
            updateDataService.updateSubSectionData({id,title,tagtext,shortDesc,resourceLink,description,company, chapter}).then(data => {  });
        }

    }
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-10">{data && data.title} ({data && data.company && data.company.companyId})</h5>
                        <div className="p-field p-col-3 p-md-1">
                            <Button id="action" label="Delete" onClick={() => {         setDisplayConfirmation(!displayConfirmation);}}></Button>
                        </div>
                        <div className="p-field p-col-9 p-md-1">
                               {!isEdit ? <Button id="action" label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button id="action" onClick={() => { setIsEdit(!isEdit) }} label="Cancel"></Button>}
                        </div>
                    </div>

                    {isEdit ? <FormLayoutEdit data={data} setData={setData}/> : <FormLayoutView data={data} />}
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field  p-col-9"></div>
                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="reset" label="Reset"></Button>}
                        </div>

                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="cancel" label="Cancel"></Button>}
                        </div>
                        <div className=" p-col-1 ">
                            {!isEdit ? "" : <Button id="submit" label="Submit"  onClick={()=>{
                                submitEditFormData(data);
                            }}></Button>}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Confirmation" visible={displayConfirmation} modal style={{ width: '350px' }} footer={<div>
            <Button label="No" icon="pi pi-times" onClick={() => {
                setDisplayConfirmation(false);
            }} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => {
                onDelete();
            }} autoFocus />
        </div>} onHide={() => {
            setDisplayConfirmation(false);
        }}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                <span>Are you sure you want to proceed?</span>
            </div>
        </Dialog>
        </div>

    )
}
