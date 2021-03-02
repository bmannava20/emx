import axios from 'axios';

export default class AddServiceData {
    baseUrl;
    constructor(BASE_URL) {
        this.baseUrl =`http://localhost:8080/training/api/training`;
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
