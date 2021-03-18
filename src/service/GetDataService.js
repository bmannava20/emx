import axios from 'axios';

export default class GetDataService {
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

    getSidebarData(id) {
        return axios.get(`${this.baseUrl}/contents/${id}`).then(res => res.data);
    }

    getChapterDropDwnData(companyId) {
        return axios.get(`${this.baseUrl}/getChaptersForCompany/${companyId}`).then(res => res.data);
    }

    getSectionDropDwnData(chapterId, companyId) {
        return axios.get(`${this.baseUrl}/getSectionsForChapter/${chapterId}/${companyId}`).then(res => res.data);
    }

    retrieveChapter(id) {
        return axios.get(`${this.baseUrl}/retrieveChapter/${id}`).then(res => res.data);
    }

    retrieveSection(id) {
        return axios.get(`${this.baseUrl}/retrieveSection/${id}`).then(res => res.data);
    }

    retrieveSubsection(id) {
        return axios.get(`${this.baseUrl}/retrieveSubsection/${id}`).then(res => {
            let subsection = res.data;
            subsection.chapter = res.data.section.chapter;
            return subsection;
        });
    }

    //delete
    deleteChapter(id){
        return axios.delete(`${this.baseUrl}/deleteChapter/${id}`).then(res => res.data);
    }
    deleteSection(id){
        return axios.delete(`${this.baseUrl}/deleteSection/${id}`).then(res => res.data);
    }
    deleteSubsection(id){
        return axios.delete(`${this.baseUrl}/deleteSubsection/${id}`).then(res => res.data);
    }

    deleteChapterVideo(id){
        return axios.delete(`${this.baseUrl}/deleteChapterResource/${id}`).then(res => res.data);
    }

    deleteSectionVideo(id){
        return axios.delete(`${this.baseUrl}/deleteSectionResource/${id}`).then(res => res.data);
    }

    deleteSubsectionVideo(id){
        return axios.delete(`${this.baseUrl}/deleteSubsectionResource/${id}`).then(res => res.data);
    }
}
