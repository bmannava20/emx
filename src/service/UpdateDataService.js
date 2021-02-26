import axios from 'axios';

export default class UpdateDataService {
    baseUrl;
    constructor(BASE_URL) {
        this.baseUrl =`http://localhost:8080/training/api/training`;
    }

    updateChapterData(data) {
        return axios.put(`${this.baseUrl}/updateChapter`,data).then(res => res.data.data);
    }

    updateSectionData(data) {
        return axios.put(`${this.baseUrl}/updateSection`,data).then(res => res.data.data);
    }

    updateSubSectionData(data) {
        return axios.put(`${this.baseUrl}/updateSubsection`,data).then(res => res.data.data);
    }
}