import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PaywallInstance from '../../Utils/PaywallInstance';
import Box from './Box';
import config from '../../Utils/config';
import './paywall.scss'
import { withRouter } from 'react-router-dom';

class ComedyPaywall extends Component {
    constructor(props) {
    super(props);
    this.state = {
        data: [],
        packageID: 'QDfI',
        packageID1: 'QDfH',
        packageID2: 'QDfI',
        doubleConsent: false,
        packagePrice1: '',
        packagePrice2: ''
        }
    }
    componentDidMount(){
        let CPPermission = localStorage.getItem('CPPermission');
        if(CPPermission === true){
            this.props.history.push('/category/comedy/page/1');
        }
        let source = localStorage.getItem('source');
        PaywallInstance.get(`${config.apiBaseUrl}/package?source=${source}&slug=comedy`)
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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let id = urlParams.get("postUrl");
        return(
            <div className="liveComponent">
                <div className="goonjLivePage">
                    <div className="landing_page_background">
                        <div className="liveContainer">
                            <img className = "gLogo" src={require("../../Assets/logoGoonj.png")} alt="Logo" />
                            <br />
                            <h1 className = "aText1 aText1b">WATCH COMEDY VIDEOS ANYTIME, ANYWHERE!</h1>
                            <Box
                                url={id ? `/${id}` : '/category/comedy/page/1'}
                                id={id}
                                permission={"CPPermission"}
                                msisdnKey={"CPMsisdn"}
                                pkgIdKey={"CPPackageId"}
                                packageID={localStorage.getItem('CPPackageId') ? localStorage.getItem('CPPackageId') : this.state.packageID}
                                packageID1={localStorage.getItem('CPPackageId') ? localStorage.getItem('CPPackageId') : this.state.packageID1}
                                packageID2={localStorage.getItem('CPPackageId') ? localStorage.getItem('CPPackageId') : this.state.packageID2}
                                pkgPrice1={this.state.packagePrice1}
                                pkgPrice2={this.state.packagePrice2}
                                msisdn={this.props.msisdn}
                                source={"web"}
                                unsubStatus={"CPSub"}
                                />
                            <div className="chargesBox lightFont">
                            <p className="cbText1">
                            <font color="#319fe7">{this.state.packagePrice2}</font> charges will be deducted 
                                from mobile balance
                            </p>
                            <p className="cbText2">
                                <font className="cancelText">for package conversion or cancellation, go to </font>
                                <Link to={"/profile"}><font color="white">Profile{">"}Subscriptions</font></Link>
                            </p>
                            <p className="cbText3">By subscribing, you are giving consent to renewal charging</p>
                            </div>
                        </div>
                    </div>
            </div>
          </div>
        );
    }
}
 
export default withRouter(ComedyPaywall);