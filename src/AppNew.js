import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import AddServiceData from "./service/AddServiceData";
import GetDataService from "./service/GetDataService";
import { Toast } from 'primereact/toast';

const AppNew = (props) => {
    const [curData,setCurData] = useState({
        title:""
    });
    const [onSelect, setOnSelect] = useState("Chapter")
    let searchInputEl = null;
    const toast = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [chapterData,setChapterData] = useState([]);
    const [sectionData,setSectionData] = useState([]);
    const history = useHistory();
    const companyIds = props.companyData.map(company=>{
        company.label = company.name;
        company.value = company.id;
        return company;
    })
    function setValue(e) {
        setOnSelect(e);
    }

    const onEnter = () => {
        if (searchInputEl) {
            searchInputEl.focus();
        }
    };

    const showError = (message) => {
        toast.current.show({severity:'error', summary: message.title, detail:message.description, life: 3000});
    }

    useEffect(()=>{
        setCurData({});
    },[onSelect])

    useEffect(()=>{
        console.log(curData,'curData');
    },[curData])

    useEffect(()=>{
        if((onSelect == 'Section' || onSelect == 'SubSection') && curData.companyId){
            const getDataService = new GetDataService();
            getDataService.getChapterDropDwnData(curData.companyId).then(res=>{
                return res.map(item=>{
                    item.label = item.title;
                    item.value = item.id;
                    return item
                })
            }).then(res =>{
                setChapterData([...res]);
            })
        }
    },[curData.companyId])


    useEffect(()=>{
        if(onSelect == 'SubSection' && curData.chapter && curData.companyId){
            const getDataService = new GetDataService();
            getDataService.getSectionDropDwnData(curData.chapter,curData.companyId).then(res=>{
                return res.map(item=>{
                    item.label = item.title;
                    item.value = item.id;
                    return item
                })
            }).then(res=>{
                setSectionData([...res]);
            })
        }
    },[curData.chapter])

    const showErrorMsg = (data,type)=>{
        const {section,chapter, title,shortDesc,resourceLink,description,companyId} = data;
        console.log(data);
        if(!title){
            showError({
                title: `${type}  required field`,
                message:'Please enter title !!'
            })
            return true;

        }else if(!companyId){
            showError({
                title:'Company Id required',
                message:'Please enter Company id !!'
            })
            return true;

        }else if((type == 'Section' || type == 'SubSection') && !chapter){
            showError({
                title:'Chapter is required ',
                message:'Please enter Chapter id !!'
            })
            return true;
        } else if((type == 'SubSection') && (!section)){
            showError({
                title:'Section required ',
                message:'Please enter Section id !!'
            })
            return true;
        }else if(!shortDesc){
            showError({
                title:'Short Desc required ',
                message:'Please enter Short Description !!'
            })
            return true;
        }

        return false;
    }
    const addChapter = (data)=>{
        const {title,tagtext,shortDesc,resourceLink,description,companyId} = data;


        const addService = new AddServiceData();
        addService.addChapterData({title,tagtext,shortDesc,resourceLink,description,company:{id: companyId}}).then(res=>{
            console.log('res',res);
            history.push({pathname:`/formlayout/${res.id}`, state:res});
            history.go(0);
        })
    }

    const addSection = (data)=>{
        const {chapter, title,tagtext,shortDesc,resourceLink,description,companyId} = data;
        const addService = new AddServiceData();
        addService.addSectionData({title,tagtext,shortDesc,resourceLink,description,company:{id: companyId}, chapter:{id: chapter}}).then(res=> {
            history.push({pathname: `/formlayout/${res.id}`, state: res});
            history.go(0);
        })
    }

    const addSubSection = (data)=>{
        const {section, title,tagtext,shortDesc,resourceLink,description,companyId} = data;
        const addService = new AddServiceData();
        addService.addSubsectionData({title,tagtext,shortDesc,resourceLink,description,company:{id: companyId}, section:{id: section}}).then(res=>{
            history.push({pathname:`/formlayout/${res.id}`, state:res});
            history.go(0);
        })
    }

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    const outerClass = classNames('p-fluid p-formgrid p-grid')

    const innerClass = classNames('p-field p-col-12')

    const SubSectionContent = <div className="p-fluid p-formgrid p-grid addnew fill-width">
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> {onSelect} </label></div>
            <div className="p-field p-col-9">
                <InputText
                    value={curData.title}
                    className={"form-input-ctrl required-field form-control"}
                    onChange={(e) => { setCurData({...curData,'title':e.target.value}) }} />
            </div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Company IDs </label></div>
            <div className="p-field p-col-9"><Dropdown value={curData.companyId} className={"form-input-ctrl required-field form-control"} onChange={e => {
                setCurData({...curData, 'companyId': e.value });
            }} options={companyIds} optionLabel="name" placeholder="Select One"></Dropdown></div>
        </div>
        {(onSelect === "Section" || onSelect === "SubSection") && <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Chapter </label></div>
            <div className="p-field p-col-9">
                <Dropdown value={curData.chapter} className={"form-input-ctrl required-field form-control"} options={[...chapterData]} onChange={e => {
                    setCurData({...curData,'chapter': e.value});
                }} optionLabel="title" placeholder="Select One"></Dropdown></div>
        </div>}

        {onSelect === "SubSection" && <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Section </label></div>
            <div className="p-field p-col-9">
                <Dropdown value={curData.section} className={"form-input-ctrl required-field form-control"} options={[...sectionData]} onChange={e => {
                    setCurData({...curData, 'section': e.value });
                }} optionLabel="title" placeholder="Select One"></Dropdown></div>
        </div>}
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Short description </label></div>
            <div className="p-field p-col-9"><InputTextarea rows={5} cols={30} className={"form-input-ctrl required-field form-control"}  onChange={e => {
                setCurData({ ...curData, 'shortDesc': e.target.value });
            }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Tagtext </label></div>
            <div className="p-field p-col-9"><InputText className={"form-input-ctrl form-control"}  value={curData.tagText} onChange={e => {
                setCurData({...curData, 'tagtext': e.target.value });
            }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Video </label></div>
            <div className="p-field p-col-9"><FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-3 center"><label> Long description </label></div>
            <div className="p-field p-col-9"><InputTextarea id="longDescription"  rows={5} cols={30} value={curData.description} className={"form-input-ctrl form-control"}  onChange={e => {
                setCurData( { ...curData, 'description': e.target.value });
            }} /></div>
        </div>
        <div className="p-fluid p-formgrid p-grid fill-width">
            <div className="p-field p-col-4 p-md-4 p-lg-6"></div>
            <div className="p-field p-col-4 p-md-4 p-lg-3">
                <Button label="Submit" onClick={()=>{
                    if(!showErrorMsg(curData,onSelect)){
                        if(onSelect == 'Chapter') {
                            addChapter(curData)
                        } else if (onSelect == 'Section'){
                            addSection(curData)
                        } else if(onSelect == 'SubSection'){
                            addSubSection(curData)
                        }
                    }
                }}></Button>
            </div>
            <div className="p-field p-col-4 p-md-4 p-lg-3">
                <Button label="Cancel" onClick={props.onSearchClick}></Button>
            </div>
            <Toast ref={toast} />
        </div>
    </div>


    const getContent = () => {
        switch (onSelect) {
            case "Chapter":
                return SubSectionContent
            case "Section":
                return SubSectionContent
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
                        <div className="p-fluid p-formgrid p-grid center-radio">
                            <div className='center' onClick={() => setValue('Chapter')} ><RadioButton value="Chapter" checked={onSelect === 'Chapter'} name="chapter" />&nbsp;Chapter&nbsp;</div>
                            <div className='center' onClick={() => setValue('Section')}>
                                <RadioButton value="Section" checked={onSelect === 'Section'} name="section" onChange={(e) => setValue(e.value)} />&nbsp;Section&nbsp;
                            </div>
                            <div className='center' onClick={() => setValue('SubSection')}>
                                <RadioButton value="SubSection" checked={onSelect === 'SubSection'} name="subsection" onChange={(e) => setValue(e.value)} />&nbsp;SubSection&nbsp;
                            </div>
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
