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
        return axios.get(`${this.baseUrl}/training/api/training/getChaptersForCompany/${companyId}`).then(res => res.data);
    }

    getSectionDropDwnData(chapterId, companyId) {
        return axios.get(`${this.baseUrl}/training/api/training/getSectionsForChapter/${chapterId}/${companyId}`).then(res => res.data);
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

    //delete
    deleteChapter(id){
        return axios.delete(`${this.baseUrl}/training/api/training/deleteChapter/${id}`).then(res => res.data);
    }
    deleteSection(id){
        return axios.delete(`${this.baseUrl}/training/api/training/deleteSection/${id}`).then(res => res.data);
    }
    deleteSubsection(id){
        return axios.delete(`${this.baseUrl}/training/api/training/deleteSubsection/${id}`).then(res => res.data);
    }

}
