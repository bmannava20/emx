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

export const FormLayoutDemo = () => {
    const history = useHistory();
    const toast = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(null);

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
        if (window.confirm('Are you sure, you want to delete this record?')) {
            // Save it!

            const getDataService = new GetDataService();

            if(data && data.typeIdentifier === 'CHAPTER'){
                getDataService.deleteChapter(data.id).then(data => {console.log("chapter",data); history.go(0) });
            }
            if(data && data.typeIdentifier === 'SECTION'){
                getDataService.deleteSection(data.id).then(data => {console.log("section",data); history.go(0)  });
            }
            if(data && data.typeIdentifier === 'SUBSECTION'){
                getDataService.deleteSubsection(data.id).then(data => {console.log("subsection",data);history.go(0)  });
            }
            console.log('yes');
        } else {
            // Do nothing!
            console.log('no');
        }
    }
    const submitEditFormData = (data) =>{
        console.log(data);
        const updateDataService = new UpdateDataService();

        if(data && data.typeIdentifier === 'CHAPTER'){
            updateDataService.updateChapterData(data).then(res => {console.log("chapter",res); history.go(0) });
        }
        if(data && data.typeIdentifier === 'SECTION'){
            updateDataService.updateSectionData(data).then(data => {console.log("section",data);history.go(0)   });
        }
        if(data && data.typeIdentifier === 'SUBSECTION'){
            updateDataService.updateSubSectionData(data).then(data => {console.log("subsection",data);history.go(0)  });
        }

    }
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-fluid p-formgrid p-grid">
                        <h5 className="p-field p-col-12 p-md-10">{data && data.title} ({data && data.company && data.company.companyId})</h5>
                        <div className="p-field p-col-3 p-md-1">
                            <Button id="action" label="Delete" onClick={() => { onDelete()}}></Button>
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
        </div>

    )
}
