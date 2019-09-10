import { observable, autorun, action, computed, decorate } from 'mobx';
import Request from './Request'
import LocalStorage from './LocalStorage'
class AppStore {
    apps = [];
    app = null;
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
    async getApp(id) {
        let app = this.apps.find((app) => app.id === id);
        if (!app) {
            this.setLoading(true);
            try {
                app = await this.request.get(this.baseUrl + `/application/${id}`);
            } finally {
                this.setLoading(false);
            }
        }
        this.setApp(app);
        return app;
    }
    setApps(apps) {
        this.apps = [...apps];
    }

    setApp(app) {
        this.app = app;
    }
    setLoading(loading) {
        this.loading = loading;
    }
}

export default decorate(AppStore, {
    apps: observable,
    app: observable,
    loading: observable,
    setApps: action,
    setLoading: action,
    setApp: action
});