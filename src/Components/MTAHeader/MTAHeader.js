import React from 'react';
import './Header.css';
import Logo from "../../Assets/logo.png";

function goBack() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const source = urlParams.get("source");

    if(source === 'mta' || source === 'mta2'){
        window.location.href = `/?source=${source}`;
    }
}

function MTAHeader() {
    const shouldHideBackButton = ((window.location.href === 'https://goonj.pk/?source=mta' || window.location.href === 'https://goonj.pk/home/?source=mta') ? true : false);
    /*const shouldHideBackButton = (window.location.href === 'http://localhost:3000/?source=mta' ? true : false);*/

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
            <div className="mtaAd" style={{display: 'none'}}>Ad Space 1</div>
        </div>
    );
}

export default MTAHeader;
