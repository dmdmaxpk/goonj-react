import config from '../Utils/config';
import AxiosInstance from '../Utils/AxiosInstance';



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let urlMsisdn = urlParams.get("msisdn");
let urlPkgId = urlParams.get("package_id");
let refresh = urlParams.get("refresh");
let source = localStorage.getItem('source');
let msisdn = urlMsisdn ? urlMsisdn : localStorage.getItem('liveMsisdn');
let CPmsisdn = urlMsisdn ? urlMsisdn : localStorage.getItem('CPMsisdn');
let livePackageId = urlPkgId ? urlPkgId : localStorage.getItem('livePackageId');
let CPPackageId = urlPkgId ? urlPkgId : localStorage.getItem('CPPackageId');

export function getPackages(){
    AxiosInstance.get(`/paywall?source=${source}`)
    .then(res =>{
        console.log(res.data);
    })
    .catch(err =>{
        console.log(err);
    })
};

export function CheckLiveStatus(){
    let statusData = {
        source,
        msisdn,
        package_id: livePackageId
    }
    if(msisdn && livePackageId){
        AxiosInstance.post('/payment/status', statusData)
        .then(res =>{
            const result = res.data.data;
            console.log(result);
            if(result.subscription_status == "expired" || (result.queued === false && result.subscription_status == "not_billed")){
                localStorage.removeItem('livePermission');
                localStorage.removeItem('liveMsisdn');
                localStorage.removeItem('livePackageId');
                localStorage.removeItem('liveSub');
            }
            else if(result.is_allowed_to_stream === true){
                if(result.subscription_status == "trial" || result.subscription_status == "billed" || (result.queued === true && result.subscription_status == "not_billed")){
                    localStorage.setItem('livePermission', true);
                    localStorage.setItem('liveMsisdn', msisdn);
                    localStorage.setItem('livePackageId', livePackageId);
                    localStorage.setItem('liveSubExpiry', result.next_billing_timestamp);
                    if(refresh){
                        window.location.href = window.location.pathname;
                    }
                }
            }
            if(result.auto_renewal == true){
                localStorage.setItem('liveSub', "active");
            }
            else if(result.subscription_status == "graced" && result.is_allowed_to_stream === false){
                localStorage.setItem('liveGraced', true)
            }
        })
        .catch(err =>{
                console.log(err);
            })
    }
}

export function CheckCPStatus(){
    console.log("CP check", msisdn, CPmsisdn, urlPkgId, CPPackageId);
    let statusData = {
        source,
        CPmsisdn,
        package_id: CPPackageId
    }
    console.log("status Data",statusData);
    if(CPmsisdn && CPPackageId){
        AxiosInstance.post('/payment/status', statusData)
        .then(res =>{
            const result = res.data.data;
            console.log(result);
            if(result.subscription_status == "expired" || (result.queued === false && result.subscription_status == "not_billed")){
                localStorage.removeItem('CPPermission');
                localStorage.removeItem('CPMsisdn');
                localStorage.removeItem('CPPackageId');
                localStorage.removeItem('CPSub');
            }
            else if(result.is_allowed_to_stream === true){
                if(result.subscription_status == "trial" || result.subscription_status == "billed" || (result.queued === true && result.subscription_status == "not_billed")){
                    localStorage.setItem('CPPermission', true);
                    localStorage.setItem('CPMsisdn', CPmsisdn);
                    localStorage.setItem('CPPackageId', CPPackageId);
                    localStorage.setItem('CPSubExpiry', result.next_billing_timestamp);
                    if(refresh){
                        window.location.href = window.location.pathname;
                    }
                }
            }
            if(result.auto_renewal == true){
                localStorage.setItem('CPSub', "active");
            }
            else if(result.subscription_status == "graced" && result.is_allowed_to_stream === false){
                localStorage.setItem('CPGraced', true)
            }
        })
        .catch(err =>{
                console.log(err);
            })
    }
}