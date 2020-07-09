import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import { Collapse, Divider } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {Link} from 'react-router-dom';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ErrorComponent from './Error';


class Unsub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            liveTvDaily: '',
            liveTvWeekly: '',
            comedyDaily: '',
            comedyWeekly: '',
            liveTvDailyPkg: '',
            liveTvWeeklyPkg: '',
            comedyDailyPkg: '',
            comedyWeeklyPkg: '',
            showUnsub: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.getPackages = this.getPackages.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.showUnsub = this.showUnsub.bind(this);
    }
    componentDidMount(){
        this.getPackages();
    }
    handleChange(e){
        console.log(typeof e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPackages(){
        let source = localStorage.getItem('source');
        AxiosInstance.get(`/paywall?source=${source}`)
        .then(res =>{
            let result = res.data.data;
            console.log("packages", result)
            this.setState({
                liveTvDaily: result[0].packages[0].package_name,
                liveTvWeekly: result[0].packages[1].package_name,
                comedyDaily: result[1].packages[0].package_name,
                comedyWeekly: result[1].packages[1].package_name,
                liveTvDailyPkg: result[0].packages[0]._id,
                liveTvWeeklyPkg: result[0].packages[1]._id,
                comedyDailyPkg: result[1].packages[0]._id,
                comedyWeeklyPkg: result[1].packages[1]._id,

            })
        })
    }
    unsubscribe(msisdn, packageId, setPkgId){
        let source = localStorage.getItem('source');
        let unsubData = {
            msisdn,
            source,
            package_id: packageId
        }
        AxiosInstance.post('/payment/unsubscribe', unsubData)
        .then(res =>{
            let result = res.data;
            console.log(result);
            localStorage.removeItem(setPkgId);
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        })
    }
    subscribe(msisdn, packageId, setPkgId){
        let source = localStorage.getItem('source');
        let subData = {
            msisdn,
            source,
            package_id: packageId
        }
        AxiosInstance.post('/payment/subscribe', subData)
        .then(res =>{
            let result = res.data;
            if(result.code === -1){
                alert(result.message);
            }
            else{
                localStorage.setItem(setPkgId, packageId);
                window.location.reload();
            }
        })
    }
    showUnsub(){
        this.setState({
            showUnsub: !this.state.showUnsub
        })
    }
    render(){
        let state = this.state;
        let msisdn = localStorage.getItem('liveMsisdn');
        let CPmsisdn = localStorage.getItem('CPmsisdn');
        const liveSubs = [
            {
                name: state.liveTvDaily,
                packageID: state.liveTvDailyPkg,
                msisdn: msisdn,
                setPkgId: "livePackageId"
            },
            {
                name: state.liveTvWeekly,
                packageID: state.liveTvWeeklyPkg,
                msisdn: msisdn,
                setPkgId: "livePackageId"
            }
        ]
        const comedySubs = [
            {
                name: state.comedyDaily,
                packageID: state.comedyDailyPkg,
                msisdn: CPmsisdn,
                setPkgId: "CPPackageId"
            },
            {
                name: state.comedyWeekly,
                packageID: state.comedyWeeklyPkg,
                msisdn: CPmsisdn,
                setPkgId: "CPPackageId"
            }
        ]
        let currentLivePkg = localStorage.getItem('livePackageId');
        let currentCPPkg = localStorage.getItem('CPPackageId');
        let liveSubStatus = localStorage.getItem('liveSub');
        let CPSubStatus = localStorage.getItem('CPSub');
        return(
            <div>
                <div className="profileHead" onClick={this.showUnsub}>
                    <p className="profileHeading floatLeft">Susbscriptions</p>
                    {this.state.showUnsub === false ?
                        <ArrowDropDownIcon className="floatRight downwardArrow" color="primary" />
                    :
                        <ArrowDropUpIcon className="floatRight downwardArrow" color="primary" />
                    }
                
                </div>
                <div className="clearfix" />
                <Collapse in={this.state.showUnsub} timeout="auto" unmountOnExit={true}>
                    {localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn')  ?
                        <GridContainer className="userInfoContainer">
                            <GridItem xs={12} sm={12} md={12} className="pkgGridItem">
                                <p className="subPkgHeading">Live tv</p>
                                {liveSubs.map(item =>
                                    <div className="subPkgDiv">
                                        <p className="floatLeft pkgName">{item.name}</p>
                                        {currentLivePkg === item.packageID && liveSubStatus === "active" && msisdn ?
                                            <button className="floatRight pkgSubBtn unsubBtn" onClick={()=> this.unsubscribe(item.msisdn, item.packageID, item.setPkgId)}>Unsubscribe</button>
                                            :
                                            <button className="floatRight pkgSubBtn subBtn" onClick={()=> this.subscribe(item.msisdn, item.packageID, item.setPkgId)}>Subscribe</button>
                                        }
                                        <div className="clearfix" />
                                    </div>
                                )
                                }
                                <Divider />
                                <br />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="pkgGridItem">
                                <p className="subPkgHeading">Comedy Portal</p>
                                {comedySubs.map(item =>
                                    <div className="subPkgDiv">
                                        <p className="floatLeft pkgName">{item.name}</p>
                                        {currentCPPkg === item.packageID && CPSubStatus === "active" && CPmsisdn ?
                                            <button className="floatRight pkgSubBtn unsubBtn" onClick={()=> this.unsubscribe(item.msisdn, item.packageID, item.setPkgId)}>Unsubscribe</button>
                                            :
                                            <button className="floatRight pkgSubBtn subBtn" onClick={()=> this.subscribe(item.msisdn, item.packageID, item.setPkgId)}>Subscribe</button>
                                        }
                                        <div className="clearfix" />
                                    </div>
                                )
                                }
                            </GridItem>
                        </GridContainer>
                    :
                        <ErrorComponent />
                    }
                </Collapse>
            </div>
        );
    }
}
 
export default withRouter(Unsub);