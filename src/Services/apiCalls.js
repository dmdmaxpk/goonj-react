import Axios from 'axios';
import config from '../Utils/config';
import PaywallInstance from '../Utils/PaywallInstance';



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let urlMsisdn = urlParams.get("msisdn");
let urlPkgId = urlParams.get("package_id");
let localSource = urlParams.get("source");
let source = localSource ? localSource : localStorage.getItem('source');
let liveMsisdn = urlMsisdn ? urlMsisdn : localStorage.getItem('liveMsisdn');
let CPmsisdn = urlMsisdn ? urlMsisdn : localStorage.getItem('CPMsisdn');
let livePackageId = (urlPkgId == "QDfC" || urlPkgId == "QDfG") ? urlPkgId : localStorage.getItem('livePackageId');
let CPPackageId = (urlPkgId === "QDfH" || urlPkgId === "QDfI") ? urlPkgId : localStorage.getItem('CPPackageId');

export function getPackages(){
    PaywallInstance.get(`/paywall?source=${source}`)
    .then(res =>{
      
    })
    .catch(err =>{
      
    })
};

export function CheckLiveStatus(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let marketingSrc = urlParams.get('marketingSrc') ? urlParams.get('marketingSrc') : localStorage.getItem('marketingSrc') ? localStorage.getItem('marketingSrc') : 'na';
    let statusData = {
        source,
        msisdn: liveMsisdn,
        package_id: livePackageId,
        marketing_source: marketingSrc
    }
    if(liveMsisdn && livePackageId){
        PaywallInstance.post('/payment/status', statusData)
        .then(res =>{
            const result = res.data.data;
            // console.log(result);
            if(res.data.code === -1){
                localStorage.clear();
            }
            else if(result.subscription_status == "expired" || (result.queued === false && result.subscription_status == "not_billed")){
                localStorage.removeItem('livePermission');
                localStorage.removeItem('liveMsisdn');
                localStorage.removeItem('livePackageId');
                localStorage.removeItem('liveSub');
            }
            else if(result.is_allowed_to_stream === true){
                if(result.subscription_status == "trial" || result.subscription_status == "billed" || (result.queued === true && result.subscription_status == "not_billed")){
                    localStorage.setItem('livePermission', true);
                    localStorage.setItem('liveMsisdn', liveMsisdn);
                    localStorage.setItem('livePackageId', livePackageId);
                    localStorage.setItem('liveSubExpiry', result.next_billing_timestamp);
                    localStorage.setItem('userID', result.user_id);
                    let userID = result.user_id;
                    let localUserId = localStorage.hasOwnProperty(userID);
                    if(localUserId === false){
                        // console.log("check user", userID)
                        localStorage.setItem(userID, 1);
                        localStorage.setItem('feedback', false);
                    }
                    // if(refresh){
                    //     window.location.href = window.location.pathname;
                    // }
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

            })
    }
}

export function CheckCPStatus(){
    let statusData = {
        source,
        msisdn: CPmsisdn,
        package_id: CPPackageId
    }
    if(CPmsisdn && CPPackageId){
        PaywallInstance.post('/payment/status', statusData)
        .then(res =>{
            const result = res.data.data;
            if(res.code === -1){
                localStorage.clear();
            }

            else if(result.subscription_status == "expired" || (result.queued === false && result.subscription_status == "not_billed")){
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
                    localStorage.setItem('userID', result.user_id);
                    let userID = result.user_id;
                    let localUserId = localStorage.hasOwnProperty(userID);
                    if(localUserId === false){
                        // console.log("check user", userID)
                        localStorage.setItem(userID, 1);
                        localStorage.setItem('feedback', false);
                    }
                    // if(refresh){
                    //     window.location.href = window.location.pathname;
                    // }
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
           
            })
    }
}

export async function RefreshTokenFunction(){
    let authBody = {
        token: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : ''
    }
    return Axios.post(`${config.paywallUrl}/auth/refresh`, authBody)
    .then(res=>{
        let result = res.data;
        // console.log("refresh auth", result)
        if(result.access_token && result.refresh_token){
            localStorage.setItem('accessToken', result.access_token)
            localStorage.setItem('refreshToken', result.refresh_token)
        }
        return result;
    })
    .catch(err =>{
        console.log(err)
    })
}


export function subscribeEasypaisa(url){
    var callback = function () {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    window.gtag('event', 'conversion', {
        'send_to': 'AW-828051162/8yrzCIrJ5-MCENqd7IoD',
        'event_callback': callback
    });
    return false;   
}

export function subscribeTelenor(url){
    var callback = function () {
        if (typeof(url) != 'undefined') {
          window.location = url;
        }
      };
      window.gtag('event', 'conversion', {
          'send_to': 'AW-828051162/WoNhCPu55-MCENqd7IoD',
          'event_callback': callback
      });
      return false;
}