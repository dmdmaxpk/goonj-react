export function setParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let src = urlParams.get("src") ? urlParams.get("src") : '';
    let source = src ? src : urlParams.get("source");
    let marketingSrc = urlParams.get("marketingSrc") ? urlParams.get("marketingSrc") : 'na';
    let mid = urlParams.get("mid");
    let tid = urlParams.get("tid");
    let pkg = urlParams.get("pkg");
    console.log("pkg", pkg, "source", source);
    console.log(pkg ? true : false);
    let localSource = localStorage.getItem('source');
    localStorage.setItem('marketingSrc', marketingSrc);
    if(source){
        localStorage.setItem('source', source);
        localStorage.setItem('mid', mid);
        localStorage.setItem('tid', tid);
        if(pkg){
            localStorage.setItem('livePackageId', pkg);
        }
    }
    else if(!source && !localSource){
        localStorage.setItem('source', 'web');
    }
}