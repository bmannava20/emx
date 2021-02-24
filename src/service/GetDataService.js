import axios from 'axios';

export default class GetDataService {
    baseUrl;
    constructor(BASE_URL) {
        this.baseUrl =`http://localhost:8080`;
    }

    getSidebarData(id) {
        return axios.get(`${this.baseUrl}/training/api/training/contents/${id}`).then(res => res.data);
    }

    getChapterDropDwnData(companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/initializeAddSection/${companyId}`).then(res => res.data);
    }

    getSectionDropDwnData(chapterId, companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/retrieveSectionsForChapter/${chapterId}/${companyId}`).then(res => res.data);
    }

    retrieveChapter(companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/retrieveChapter/${companyId}`).then(res => res.data);
    }

    retrieveSection(companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/retrieveSection/${companyId}`).then(res => res.data);
    }

    retrieveSubsection(companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/retrieveSubsection/${companyId}`).then(res => res.data);
    }

}
