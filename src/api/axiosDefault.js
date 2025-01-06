import axios from "axios";

axios.defaults.baseURL = 'https://instapaws-api-7ae61eec653f.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;