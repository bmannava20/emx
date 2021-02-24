import axios from 'axios';

export default class AddServiceData {
    baseUrl;
    constructor(BASE_URL) {
        this.baseUrl =`http://localhost:8080`;
    }

    addChapterData(data) {
        return axios.post(`${this.baseUrl}/training/api/training/addChapter`,data).then(res => res.data.data);
    }

    addSectionData(data) {
        return axios.post(`${this.baseUrl}/training/api/training/addSection`,data).then(res => res.data.data);
    }

    addSubSectionData(data) {
        return axios.post(`${this.baseUrl}/training/api/training/addSubSection`,data).then(res => res.data.data);
    }
}
