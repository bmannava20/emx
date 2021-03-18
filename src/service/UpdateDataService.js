import axios from 'axios';

export default class UpdateDataService {
    baseUrl;
    constructor(BASE_URL) {
        if(window.location.hostname === 'localhost'){
            this.baseUrl =`http://qatraining.mymxportal.com/training-api/api/training`;
        }else{
            this.baseUrl = `${window.location.protocol}//${window.location.host}/training-api/api/training`
        }
    }

    updateChapterData(data,file) {
        let formData = new FormData();
        formData.append('chapter',JSON.stringify(data));
        formData.append('file',file);
        return axios.put(`${this.baseUrl}/updateChapter`, formData).then(res => res.data.data);
    }

    updateSectionData(data,file) {

        let formData = new FormData();
        formData.append('section',JSON.stringify(data));
        formData.append('file',file);
        return axios.put(`${this.baseUrl}/updateSection`, formData).then(res => res.data.data);
    }

    updateSubSectionData(data,file) {
        let formData = new FormData();
        formData.append('subSection',JSON.stringify(data));
        formData.append('file',file);
        return axios.put(`${this.baseUrl}/updateSubsection`, formData).then(res => res.data.data);
    }
}