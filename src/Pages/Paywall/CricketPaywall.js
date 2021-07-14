import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AxiosInstance from '../../Utils/AxiosInstance';
import Box from './Box';
import config from '../../Utils/config';
import './paywall.scss'
import { Link } from 'react-router-dom';

class CricketPaywall extends Component {
    constructor(props) {
    super(props);
    this.state = {
        data: [],
        packageID: 'QDfG',
        packageID1: 'QDfC',
        packageID2: 'QDfG',
        doubleConsent: false,
        packagePrice1: '',
        packagePrice2: ''
        }
    }
    componentDidMount(){
        let livePermission = localStorage.getItem('livePermission');
        if(livePermission === true){
            this.props.history.push('/live-tv');
        }
        let source = localStorage.getItem('source');
        AxiosInstance.get(`${config.apiBaseUrl}/package?source=${source}&slug=live`)
        .then(res =>{
        let packageData = res.data;
        this.setState({
            package: packageData,
            packagePrice1: packageData[0].package_desc,
            packageID1: packageData[0]._id,
            packagePrice2: packageData[1].package_desc,
            packageID2: packageData[1]._id,
        })
        })
    }
      
    render(){
        let source = localStorage.getItem('source') ? localStorage.getItem('source') : 'web';
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let slug = urlParams.get("slug");
        return(
            <div className="liveComponent">
                <div className="goonjLivePage">
                    <div className="cricketPaywallBg paywallContainer">
                        <div className="liveContainer liveCricketComponent">
                            {/* <img className = "gLogo" src={require("../../Assets/logoGoonj.png")} alt="Logo" />
                            <br /> */}
                            <h1 className = "aText1 aText1b cricketText">SAFAR ME HO YA HO TV SE DOOR, KABHI BHI</h1>
                            <h1 className = "aText1 aText1b cricketText">KAHEN BHI DEKHO EXCITING CRICKET MATCHES</h1>
                            <h1 className = "aText1 aText1b cricketText"><font color="#9ee132">GOONJ</font> MOBILE TV PER!</h1>
                            <br />
                            <Box
                                url={slug ? `/channel/${slug}` : '/live-tv'}
                                slug={slug}
                                permission={"livePermission"}
                                msisdnKey={"liveMsisdn"}
                                pkgIdKey={"livePackageId"}
                                packageID={localStorage.getItem('livePackageId') ? localStorage.getItem('livePackageId') : this.state.packageID}
                                packageID1={localStorage.getItem('livePackageId') ? localStorage.getItem('livePackageId') : this.state.packageID1}
                                packageID2={localStorage.getItem('livePackageId') ? localStorage.getItem('livePackageId') : this.state.packageID2}
                                pkgPrice1={this.state.packagePrice1}
                                pkgPrice2={this.state.packagePrice2}
                                msisdn={this.props.msisdn}
                                source={source}
                                unsubStatus={"liveSub"}
                            />
                            <div className="lightFont cricketPWConsentText">
                            {/* <p className="cbText1">
                            <font color="#319fe7">{this.state.packagePrice2}</font> charges will be deducted  
                                from mobile balance
                            </p> */}
                            <p className="cbText2 cricketText">
                                <p className="cancelText cricketText">I agree to daily recurring charges deduction from my mobile balance until Unsubscription</p>
                                <p className="cancelText cricketText">CANCEL ANYTIME FROM
                                    <Link style={{color: "white !important", fontWeight: "900"}} to={"/profile"}><font color="white" className=""> PROFILE{">"}SUBSCRIPTIONS</font></Link>
                                </p>
                            </p>
                            <img className="flagsImg" src={require('../../Assets/flags.png')} />
                            {/* <p className="cbText3">By subscribing, you are giving consent to renewal charging</p> */}
                            </div>
                        </div>
                    </div>
            </div>
          </div>
        );
    }
}
 
export default withRouter(CricketPaywall);