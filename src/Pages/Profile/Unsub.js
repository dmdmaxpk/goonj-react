import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import PaywallInstance from '../../Utils/PaywallInstance';
import { Collapse, Divider, Modal, Fade } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ErrorComponent from './Error';
import Loader from '../../Components/Loader/Loader'
import AxiosInstance from '../../Utils/AxiosInstance';


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
            showUnsub: false,
            modal: false,
            displayMsisdn: '',
            displayPackageId: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.getPackages = this.getPackages.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.showUnsub = this.showUnsub.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getPackageName = this.getPackageName.bind(this);
    }
    componentDidMount(){
        this.getPackages();
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPackages(){
        let source = localStorage.getItem('source');
        AxiosInstance.get(`/paywall?source=${source}`)
        .then(res =>{
            let result = res.data.data;
            console.log(result[0].packages[0]._id)
            this.setState({
                liveTvDaily: result[0].packages[0].package_name,
                liveTvWeekly: result[0].packages[1].package_name,
                liveTvDailyPkg: result[0].packages[0]._id,
                liveTvWeeklyPkg: result[0].packages[1]._id,
            })
        })
    }
    unsubscribe(){
        this.setState({loading: true});
        let source = localStorage.getItem('source');
        let {displayMsisdn, displayPackageId, setPkgId} = this.state;
        let unsubData = {
            msisdn: displayMsisdn,
            source,
            package_id: displayPackageId
        }
        PaywallInstance.post('/payment/unsubscribe', unsubData)
        .then(res =>{
            let result = res.data;
            localStorage.removeItem(setPkgId);
            window.location.reload();
        })
        .catch(err =>{
            this.setState({loading: false})
        })
    }
    subscribe(){
        this.setState({loading: true});
        let source = localStorage.getItem('source');
        let {displayMsisdn, displayPackageId, setPkgId} = this.state;
        let subData = {
            msisdn: displayMsisdn,
            source,
            package_id: displayPackageId
        }
        // console.log(subData);
        PaywallInstance.post('/payment/subscribe', subData)
        .then(res =>{
            let result = res.data;
            if(result.code === -1){
                alert(result.message);
                this.setState({loading: false});
            }
            else{
                localStorage.setItem(setPkgId, displayPackageId);
                window.location.reload();
            }
        })
    }
    showUnsub(){
        this.setState({
            showUnsub: !this.state.showUnsub
        })
    }
    openModal(msisdn, packageId, setPkgId, btnClick){
        let displayBillingDate = setPkgId === 'livePackageId' ? localStorage.getItem('liveSubExpiry') : localStorage.getItem('CPSubExpiry');

        this.setState({
            modal: true,
            displayMsisdn: msisdn,
            displayPackageId: packageId,
            setPkgId,
            showBtn: btnClick
        });
        if(btnClick === "unsub"){
            this.setState({
                displayHeading: "Unsubscribe",
                displayText: `Your subscription is valid till ${new Date(displayBillingDate).toLocaleDateString()}. Are you sure you want to unsubscribe ${this.getPackageName(packageId)} Plan?`
            })
        }
        else{
            this.setState({
                displayHeading: "Subscribe",
                displayText: `Your subscription is valid till ${new Date(displayBillingDate).toLocaleDateString()}. Are you sure you want to subscribe to ${this.getPackageName(packageId)} Plan?`
            })
        }
    }
    closeModal(){
        this.setState({
            modal: false
        })
    }
    getPackageName(packageId){
        if(packageId === this.state.liveTvDailyPkg){
            return this.state.liveTvDaily
        }
        else if(packageId === this.state.liveTvWeeklyPkg){
            return this.state.liveTvWeekly
        }
        else if(packageId === this.state.comedyDailyPkg){
            return this.state.comedyDaily
        }
        else if(packageId === this.state.comedyWeeklyPkg){
            return this.state.comedyWeekly
        }
    }
    render(){
        let state = this.state;
        let msisdn = localStorage.getItem('liveMsisdn');
        let CPmsisdn = localStorage.getItem('CPMsisdn');
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
                                {localStorage.getItem('liveMsisdn') ?
                                    liveSubs.map(item =>
                                        <div className="subPkgDiv">
                                            {console.log(item)}
                                            <p className="floatLeft pkgName">{item.name}</p>
                                            {currentLivePkg === item.packageID && liveSubStatus === "active" && msisdn ?
                                                <button className="floatRight pkgSubBtn unsubBtn" onClick={()=> this.openModal(item.msisdn, item.packageID, item.setPkgId, "unsub")}>Unsubscribe</button>
                                                :
                                                <button className="floatRight pkgSubBtn subBtn" onClick={()=> this.openModal(item.msisdn, item.packageID, item.setPkgId, "sub")}>Subscribe</button>
                                            }
                                            <div className="clearfix" />
                                        </div>
                                    )
                                :
                                <ErrorComponent paywall="live" />
                                }
                                <Divider />
                                <br />
                            </GridItem>
                            {/* <GridItem xs={12} sm={12} md={12} className="pkgGridItem">
                                <p className="subPkgHeading">Comedy Portal</p>
                                {localStorage.getItem('CPMsisdn') ?
                                    comedySubs.map(item =>
                                        <div className="subPkgDiv">
                                            <p className="floatLeft pkgName">{item.name}</p>
                                            {currentCPPkg === item.packageID && CPSubStatus === "active" && CPmsisdn ?
                                                <button className="floatRight pkgSubBtn unsubBtn" onClick={()=> this.openModal(item.msisdn, item.packageID, item.setPkgId, "unsub")}>Unsubscribe</button>
                                                :
                                                <button className="floatRight pkgSubBtn subBtn" onClick={()=> this.openModal(item.msisdn, item.packageID, item.setPkgId, "sub")}>Subscribe</button>
                                            }
                                            <div className="clearfix" />
                                        </div>
                                    )
                                :
                                <ErrorComponent paywall="comedy" />
                                }
                            </GridItem> */}
                        </GridContainer>
                    :
                        <ErrorComponent />
                    }
                </Collapse>
                <Modal
                    className="modalContainer"
                    open={this.state.modal}
                    onClose={this.closeModal}
                    disableBackdropClick={true}
                    closeAfterTransition
                >
                    <Fade in={this.state.modal}>
                        {this.state.loading === false ?
                            <div className="modalDiv">
                                <p className="modalHeading">{this.state.displayHeading}</p>
                                <p className="modalBody">{this.state.displayText}</p>
                                <button className="pkgSubBtn btnCloseModal" onClick={this.closeModal}>Cancel</button>
                                {this.state.showBtn === "unsub" ?
                                    <button className="pkgSubBtn unsubBtn" onClick={this.unsubscribe}>Confirm</button>
                                    :
                                    <button className="pkgSubBtn subBtn" onClick={this.subscribe}>Confirm</button>
                                }
                            </div>
                        :
                            <div className="loaderDiv">
                                <Loader />
                            </div>
                        }
                    </Fade>
                </Modal>
            </div>
        );
    }
}
 
export default withRouter(Unsub);