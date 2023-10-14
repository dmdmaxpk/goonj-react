import React from 'react';
import './Header.css'; // Import your CSS file
import Logo from "../../Assets/logo.png";

function goBack() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const source = urlParams.get("source");

    if(source === 'mta'){
        window.location = 'https://goonj.pk/?source=mta'; //production area url
    }
    else if (source === 'mta2'){
        window.location = 'https://goonj.pk/?source=mta2'; //production area url
    }     

}

function MTAHeader() {
    const shouldHideBackButton = (window.location.href === 'http://localhost:3000/?source=mta' ? true : false);

    return (
        <div className="mainMtaContainer">
            <div className="mtaHeader">
                <div className="back-button" onClick={goBack}>
                    <a>{shouldHideBackButton ? '' : 'Back'}</a>
                </div>
                <div className="center-logo">
                    <img src={Logo} alt="Goonj" />
                </div>
            </div>
            <div className="mtaAd">Ad Space 1</div>
        </div>
    );
}

export default MTAHeader;
