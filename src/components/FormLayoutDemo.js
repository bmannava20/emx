import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'primereact/button';
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
        let curData = history.location.state;
        const getDataService = new GetDataService();
        if(curData) {
            localStorage.setItem('curData', JSON.stringify(curData));
        }else {
            curData = JSON.parse(localStorage.getItem('curData'));
        }
        if(curData && curData.typeIdentifier === 'CHAPTER'){
            getDataService.retrieveChapter(curData.id).then(data => { setData(data) });
        }
        if(curData && curData.typeIdentifier === 'SECTION'){
            getDataService.retrieveSection(curData.id).then(data => { setData(data) });
        }
        if(curData && curData.typeIdentifier === 'SUBSECTION'){
            getDataService.retrieveSubsection(curData.id).then(data => { setData(data) });
        }
    }, [history.location.pathname]);


    useEffect(()=>{
        //console.log('history.location.state',history.location.state,history);
    },[history.location.state])


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
        const companyData = typeof company == 'string' ? {id:company}:company
        const chapterData = typeof chapter == 'string' ? {id:chapter}:chapter
        const sectionData = typeof section == 'string' ? {id:section}:section
        if(data && data.typeIdentifier === 'CHAPTER'){

            updateDataService.updateChapterData({id,title,tagtext,shortDesc,resourceLink,description,company : companyData}).then(res => {   });
        }
        if(data && data.typeIdentifier === 'SECTION'){
            updateDataService.updateSectionData({id,title,tagtext,shortDesc,resourceLink,description,company :companyData, chapter:chapterData}).then(data => {   });
        }
        if(data && data.typeIdentifier === 'SUBSECTION'){

            updateDataService.updateSubSectionData({id,title,tagtext,shortDesc,resourceLink,description,company:companyData, chapter:chapterData, section:sectionData}).then(data => {  });
        }

    }
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div>
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-8">{data && data.title} {data && data.company && data.company.companyId}</h5>
                        <div className="p-field p-md-2">
                            <Button disabled={!data} style={{'opacity': !data ? 0.5 : 1}} id="delete" label="Delete" onClick={() => { setDisplayConfirmation(!displayConfirmation);}}></Button>
                        </div>
                        <div className="p-field p-md-2">
                               {!isEdit ? <Button disabled={!data} style={{'opacity': !data ? 0.5 : 1}} id="edit" label="Edit" onClick={() => { setIsEdit(!isEdit) }}></Button> : <Button className={!data && 'opacity-blur'} disabled={!data} id="action" onClick={() => { setIsEdit(!isEdit) }} label="Cancel"></Button>}
                        </div>
                    </div>

                    {isEdit ? <FormLayoutEdit data={data} setData={setData}/> : <FormLayoutView data={data} />}
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field  p-col-6"></div>
                        <div className=" p-col-2 ">
                            {!isEdit ? "" : <Button id="reset" label="Reset"></Button>}
                        </div>

                        <div className=" p-col-2 ">
                            {!isEdit ? "" : <Button id="cancel" label="Cancel"></Button>}
                        </div>
                        <div className=" p-col-2 ">
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
                <span><i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} /></span>
                <span className="alignText">Are you sure you want to proceed?</span>
            </div>
        </Dialog>
        </div>

    )
}
