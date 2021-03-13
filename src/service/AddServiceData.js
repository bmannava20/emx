import axios from 'axios';

export default class AddServiceData {
    baseUrl;
    constructor(BASE_URL) {
        if(window.location.hostname === 'localhost'){
            this.baseUrl =`http://qatraining.mymxportal.com/training-api/api/training`;
        }else{
            this.baseUrl = `${process.env.REACT_APP_API_URL}/training-api/api/training`
        }
    }

    addChapterData(data) {
        return axios.post(`${this.baseUrl}/addChapter`,data).then(res => res.data);
    }

    addSectionData(data) {
        return axios.post(`${this.baseUrl}/addSection`,data).then(res => res.data);
    }

    addSubsectionData(data) {
        return axios.post(`${this.baseUrl}/addSubsection`,data).then(res => res.data);
    }
}
