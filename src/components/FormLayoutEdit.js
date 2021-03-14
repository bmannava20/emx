import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { useHistory } from 'react-router-dom';
import CustomerService from '../service/CustomerService';
import GetDataService from "../service/GetDataService";

export const FormLayoutEdit = (props) => {
    const history = useHistory();
    const toast = useRef(null);
    const [dropdownItem, setDropdownItem] = useState("");

    const [companyData, setCompanyData] = useState([]);
    const [chapterData,setChapterData] = useState([]);
    const [sectionData,setSectionData] = useState([])

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    useEffect(() => {
        const getDataService = new GetDataService(process.env.TRAINING_APP_BASE_URL);
        getDataService.getSidebarData('JOR').then((data) => {
            setCompanyData(data.companies);
        }).catch((err)=>{
        });
    }, []);

    useEffect(() => {
        setDropdownItem(props.data && props.data.company);
        props.setData(props.data)
    }, [props])

    useEffect(()=>{
        if(props.data && (props.data.typeIdentifier == 'SECTION' || props.data.typeIdentifier == 'SUBSECTION') && props.data.company){
            const getDataService = new GetDataService();
            getDataService.getChapterDropDwnData(props.data.company.id).then(res=>{
                return res.map(item=>{
                    item.label = item.title;
                    item.value = item.id;
                    return item
                })
            }).then(res =>{
                setChapterData([...res]);
            })
        }
    },[props.data && props.data.company])


    useEffect(()=>{

        if(props.data && props.data.typeIdentifier == 'SUBSECTION' && props.data.chapter && props.data.company){
            const getDataService = new GetDataService();
            getDataService.getSectionDropDwnData(props.data.chapter && props.data.chapter.id ? props.data.chapter.id : props.data.chapter ,props.data.company.id).then(res=>{
                return res.map(item=>{
                    item.label = item.title;
                    item.value = item.id;
                    return item
                })
            }).then(res=>{
                setSectionData([...res]);
            })
        }
    },[props.data && props.data.chapter])

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label>Title</label></div>
                        <div className="p-field p-col-7">  <InputText className={"form-input-ctrl required-field form-control p-inputtext-height"} id="tittle" type="text" value={props.data && props.data.title} onChange={(e) => { props.setData({ ...props.data, title: e.target.value }) }} /></div>

                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"> <label htmlFor="companyID">Company</label></div>
                            <div className="p-field p-col-7"><Dropdown id="companyID" className={"form-input-ctrl required-field form-control"} value={props.data && props.data.company} options={companyData} onChange={(e) => {
                                props.setData({...props.data,company:e.value})
                            }} optionLabel="name" placeholder="Select One"></Dropdown></div>

                    </div>
                    {(props.data && props.data.typeIdentifier === "SECTION" || props.data.typeIdentifier === "SUBSECTION") &&
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label> Chapter </label></div>
                        <div className="p-field p-col-7">
                            <Dropdown id="chapter" value={props.data && props.data.chapter && props.data.chapter.id ? props.data.chapter.id:props.data.chapter} className={"form-input-ctrl required-field form-control"} options={[...chapterData]} onChange={e => {
                                props.setData({...props.data,'chapter': e.value});
                            }} optionLabel="title" placeholder="Select One"></Dropdown></div>
                    </div>}

                    {props.data && props.data.typeIdentifier === "SUBSECTION" && <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label> Section </label></div>
                        <div className="p-field p-col-7">
                            <Dropdown id="section" value={props.data && props.data.section && props.data.section.id ? props.data.section.id : props.data.section } className={"form-input-ctrl required-field form-control"} options={[...sectionData]} onChange={e => {
                                props.setData({...props.data, 'section': e.value });
                            }} optionLabel="title" placeholder="Select One"></Dropdown></div>
                    </div>}
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"><label htmlFor="shortDesc">Short Description</label> </div>
                            <div className="p-field p-col-7"><InputTextarea id="shortDesc" rows="4" className={"form-control required-field"} value={props.data && props.data.shortDesc} onChange={(e) => { props.setData({ ...props.data, shortDesc: e.target.value }) }} /></div>

                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-2 center"><label htmlFor="videoLink">Video Link</label></div>
                            <div className="p-field p-col-7">    <FileUpload name="demo[]" url="./upload.php" emptyTemplate={<div>

                                <video width="520" height="400" controls>
                                    {/* <source  src={data && data.resourceLink} type="video/youtube" ></source> */}
                                    <source src="https://ram--training-test.s3-us-west-1.amazonaws.com/m/outputoutput.mp4" type="video/mp4"></source>
                                    <source src="https://ram--training-test.s3-us-west-1.amazonaws.com/m/outputoutput.mp4" type="video/ogg"></source>
                                    Your browser does not support the video tag.
                                </video>
                                <i className="pi pi-trash p-mr-2"></i>
                            </div>} onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-2 center"><label htmlFor="tagText">Tag text/Names</label></div>
                        <div className="p-field p-col-7"> <InputTextarea rows="5.5" id="tagtext" className={"form-control"} value={props.data && props.data.tagtext} onChange={(e) => { props.setData({ ...props.data, tagtext: e.target.value }) }} /></div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid ">
                        <div className="p-field p-col-2 center"><label htmlFor="longDesc">Long Description</label></div>
                        <div className="p-field p-col-7"><InputTextarea id="longDesc" rows="8" className={"form-control"} value={props.data && props.data.description} onChange={(e) => { props.setData({ ...props.data, description: e.target.value }) }} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
