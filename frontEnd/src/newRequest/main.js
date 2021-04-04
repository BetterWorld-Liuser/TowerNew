import Axios from 'axios';
import TowerConfig from '../../config'

let app = new Axios.create({
    baseURL: TowerConfig.developmentMode?TowerConfig.developmentURL:TowerConfig.productionURL,
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export default app