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
        this.setLoading(true);
        try {
            let result = await this.request.get(this.baseUrl + `/applications/${appType}`);
            this.setApps(result);
        } finally {
            this.setLoading(false);
        }

    }
    setApps(apps) {
        this.apps = [...apps];
    }
    setLoading(loading) {
        this.loading = loading;
    }
}

export default decorate(AppStore, {
    apps: observable,
    loading: observable,
    setApps: action,
    setLoading: action

});