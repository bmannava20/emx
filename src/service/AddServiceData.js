import axios from 'axios';

export default class AddServiceData {
    baseUrl;
    constructor(BASE_URL) {
        if(window.location.hostname === 'localhost' && window.location.port === "8080"){
            this.baseUrl =`http://localhost:8080/training/api/training`;
        }else if(window.location.hostname === 'localhost'){
            this.baseUrl =`http://qatraining.mymxportal.com/training-api/api/training`;
        }else{
            this.baseUrl = `${window.location.protocol}//${window.location.host}/training-api/api/training`
        }
    }

    addChapterData(data,file) {
        let formData = new FormData();
        formData.append('chapter',JSON.stringify(data));
        formData.append('file',file);
        return axios.post(`${this.baseUrl}/addChapter`, formData).then(res => res.data);
    }

    addSectionData(data,file) {
        let formData = new FormData();
        formData.append('section',JSON.stringify(data));
        formData.append('file',file);
        return axios.post(`${this.baseUrl}/addSection`,formData).then(res => res.data);
    }

    addSubsectionData(data,file) {
        let formData = new FormData();
        formData.append('subSection',JSON.stringify(data));
        formData.append('file',file);
        return axios.post(`${this.baseUrl}/addSubsection`,formData).then(res => res.data);
    }
}
