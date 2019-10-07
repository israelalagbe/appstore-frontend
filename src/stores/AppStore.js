import { observable, autorun, action, computed, decorate } from 'mobx';
import Request from './Request'
import LocalStorage from './LocalStorage'
class AppStore {
    apps = [];
    app = null;
    loading = false;

    appName = "";
    appDescription = "";
    deviceType = "android";
    image = null;
    file = null;
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
    async fetchAppsByDeveloperId(developerId) {
        this.setLoading(true);
        try {
            let result = await this.request.get(this.baseUrl + `/developers/${developerId}/applications`);
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
    setAppName(appName) {
        this.appName = appName;
    }
    setAppDescription(appDescription) {
        this.appDescription = appDescription;
    }
    setDeviceType(deviceType) {
        this.deviceType = deviceType;
    }
    setLoading(loading) {
        this.loading = loading;
    }
    setImageUri(image) {
        this.image = image;
    }
    setFile(file) {
        this.file = file;
    }
    async saveApp() {
        if (!this.appName || !this.appDescription || !this.deviceType || !this.image || !this.file) {
            throw new Error("All inputs are required");
        }
        let image = await this.request.uploadFile(`${this.baseUrl}/files`, 'file', this.image);
        let file = await this.request.uploadFile(`${this.baseUrl}/files`, 'file', this.file);
        console.log(image, file);
    }
}

export default decorate(AppStore, {
    apps: observable,
    app: observable,
    loading: observable,
    appName: observable,
    appDescription: observable,
    deviceType: observable,
    file: observable,
    setApps: action,
    setLoading: action,
    setApp: action,
    setAppName: action,
    setAppDescription: action,
    setDeviceType: action,
    setImageUri: action,
    setFile: action
});