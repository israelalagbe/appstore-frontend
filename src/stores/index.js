import LocalStorage from './LocalStorage'
import Request from './Request'
import axios from 'axios'
import AuthStore from './AuthStore'
import {
    configure
} from 'mobx';
import AppStore from './AppStore';

configure({
    enforceActions: true
});

//const baseUrl = "http://israel.megalfacademy.com/api"
//const baseUrl = "http://192.168.173.1/farm_market/public/api"
//const baseUrl = "http://appstore.successfarm.com.ng/api";
const baseUrl = "http://127.0.0.1:8000/api";
let request = new Request(axios);
let storage = new LocalStorage(localStorage);
let authStore = new AuthStore(request, storage, baseUrl)
let appStore = new AppStore(request, storage, baseUrl);




export default {
    authStore,
    axios,
    request,
    baseUrl,
    localStorage: storage,
    appStore
}; 