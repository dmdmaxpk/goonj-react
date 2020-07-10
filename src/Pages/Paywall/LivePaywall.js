import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AxiosInstance from '../../Utils/AxiosInstance';
import Box from './Box';
import config from '../../Utils/config';
import './paywall.scss'

class LivePaywall extends Component {
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
        let source = localStorage.getItem('source');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let slug = urlParams.get("slug");
        return(
            <div className="liveComponent">
                <div className="goonjLivePage">
                    <div className="landing_page_background">
                        <div className="liveContainer">
                            <img className = "gLogo" src={require("../../Assets/logoGoonj.png")} />
                            <br />
                            <h1 className = "aText1 aText1b">WATCH LIVE TV ANYTIME, ANYWHERE!</h1>
                            <Box
                                url={slug? `/channel/${slug}` : '/live-tv'}
                                slug={slug}
                                permission={"livePermission"}
                                msisdnKey={"liveMsisdn"}
                                pkgIdKey={"livePackageId"}
                                packageID={this.state.packageID}
                                packageID1={this.state.packageID1}
                                packageID2={this.state.packageID2}
                                pkgPrice1={this.state.packagePrice1}
                                pkgPrice2={this.state.packagePrice2}
                                msisdn={this.props.msisdn}
                                source={source}
                                unsubStatus={"liveSub"}
                            />
                            <div className="chargesBox lightFont">
                            <p className="cbText1">
                            <font color="#319fe7">{this.state.packagePrice2}</font> Weekly charges after free trial 
                                from mobile balance
                            </p>
                            <p className="cbText2">
                                <font className="cancelText">for package conversion or cancellation, go to </font>Profile{">"}Subscriptions
                            </p>
                            </div>
                            {/* <p className="loginLinkText">Already signed up? <font className="loginLink">click here to login</font> </p> */}
                        </div>
                    </div>
            </div>
          </div>
        );
    }
}
 
export default withRouter(LivePaywall);