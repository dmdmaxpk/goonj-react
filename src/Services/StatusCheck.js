import config from '../Utils/config';
import AxiosInstance from '../Utils/AxiosInstance';


export function checkLiveStatus(){
    AxiosInstance.get('/')
    AxiosInstance.get('/payment/status')
    .then(res =>{

    })
    .catch(err =>{
        console.log(err);
    })
}