import { observable, autorun, action, computed, decorate } from 'mobx';
import Request from './Request'
import LocalStorage from './LocalStorage'
class AppStore {
    apps = [];
    loading = false;
    /**
     * 
     * @param {Request} request 
     * @param {LocalStorage} localStorage 
     * @param {string} baseUrl
     */
    constructor(request, localStorage, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl
        this.localStorage = localStorage
    }
    async fetchApps(appType) {
        let result = await this.request.get(this.baseUrl + `/applications/${appType}`);
        this.setApps(result);
    }
    setApps(apps) {
        this.apps = [...apps];
    }
}

export default decorate(AppStore, {
    apps: observable,
    loading: observable,
    setApps: action

});