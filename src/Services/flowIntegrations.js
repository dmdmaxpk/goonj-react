export function setParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let source = urlParams.get("source");
    let marketingSrc = urlParams.get("marketingSrc");
    let mid = urlParams.get("mid");
    let tid = urlParams.get("tid");
    let localSource = localStorage.getItem('source');
    if(source){
        localStorage.setItem('source', source);
        if(source === 'affiliate_web'){
            localStorage.setItem('marketingSrc', marketingSrc);
            localStorage.setItem('mid', mid);
            localStorage.setItem('tid', tid);
        }
    }
    else if(!source && !localSource){
        localStorage.setItem('source', 'web');
    }
}