import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from "../../Assets/logo.png";
import { withRouter } from "react-router-dom";

function goBack() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const source = urlParams.get("source");

    if(source === 'mta' || source === 'mta2'){
        window.location.href = `/?source=${source}`;
    }
}



function MTAHeader(props) {
    const [value, setValue] = useState('');
    const [currentPath, setcurrentPath]=useState("");
    const shouldHideBackButton = ((window.location.href === 'https://goonj.pk/?source=mta' || window.location.href === 'https://goonj.pk/home/?source=mta') ? true : false);
    /*const shouldHideBackButton = (window.location.href === 'http://localhost:3000/?source=mta' ? true : false);*/

    const handleChange = event => {
        const { value } = event.target;
        setValue(value);
        if (
          Number(value?.length) === 1 &&
          props.currentRoute !== "/searchresults"
        ) {
          setcurrentPath(props.currentRoute)
        }
        else if (Number(value?.length) === 0) {
        }
        else if (Number(value?.length) > 0) {
          props.history.push({
            pathname: "/searchresults/?source=mta",
            state: {searchValue: value}
          });
        }
      };

    useEffect(() => {
        if (value !== '') {
            props.history.push({
                pathname: "/searchresults/?source=mta",
                state: {searchValue: value}
            })
        }
    }, [value])

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
            <div className='SearchContainer'>
            <span className='SearchBar'>
                <input className="first-search" style={{border: '1px solid white', borderRight: 'none'}} type="text" placeholder='Search' name="search" value={value} onChange={handleChange}/>
                <button style={{border: '1px solid white', borderLeft: 'none'}} id="Icon"><i className='fa fa-search' for="icon"></i></button>
            </span>
            </div>
        </div>
    );
}

export default withRouter(MTAHeader);
