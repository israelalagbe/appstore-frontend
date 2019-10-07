import { observable, autorun, action, computed, decorate } from 'mobx';
import Request from './Request';
import LocalStorage from './LocalStorage';
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
    constructor(request, localStorage, baseUrl, authStore) {
        this.request = request;
        this.baseUrl = baseUrl
        this.localStorage = localStorage;
        this.authStore = authStore;
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
    handleResponse(e) {
        this.setLoading(false)
        if (e && e.data && e.data.message)
            return Promise.reject(new Error(e.data.message))
        else if (e.message)
            return Promise.reject(e);
        else
            return Promise.reject(e);
    }
    async saveApp() {

        if (!this.appName || !this.appDescription || !this.deviceType || !this.image || !this.file) {
            throw new Error("All inputs are required");
        }
        this.setLoading(true);
        try {
            let image = await this.request.uploadFile(`${this.baseUrl}/files`, 'file', this.image);
            let file = await this.request.uploadFile(`${this.baseUrl}/files`, 'file', this.file);
            let token = await this.localStorage.getRaw('token');
            let res = await this.request.post(this.baseUrl + "/applications", {
                name: this.appName,
                description: this.appDescription,
                url: file.url,
                device_type: this.deviceType,
                image: image.url
            }, {
                headers: { token: token }
            }).catch(this.handleResponse.bind(this));
        } finally {
            this.setLoading(false);
        }
    }
    clearInputs() {
        this.setAppName('');
        this.setAppDescription('');
        this.setFile(null);
        this.setDeviceType('android');
        this.setImageUri(null);
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