import Axios from 'axios';
import TowerConfig from '../../towerConfig'


let app = new Axios.create({
    //baseURL: 'https://backside.liuzhengdong.top:7865',
    baseURL: TowerConfig.baseURL,
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})


app.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    /* console.log(token) */
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})





export default app
