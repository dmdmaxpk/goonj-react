import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import { Collapse } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {Link} from 'react-router-dom';


class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showProfile: false
        }
        this.showProfile = this.showProfile.bind(this);    
    }
    showProfile(){
        this.setState({
            showProfile: !this.state.showProfile
        })
    }
    render(){
        return(
            <div>
                <div className="profileHead" onClick={this.showProfile}>
                    <p className="profileHeading floatLeft">Privacy Policy</p>
                    {this.state.showProfile === false ?
                        <ArrowDropDownIcon className="floatRight downwardArrow" color="primary" />
                    :
                        <ArrowDropUpIcon className="floatRight downwardArrow" color="primary" />
                    }
                </div>
                <div className="clearfix" />
                <Collapse in={this.state.showProfile} timeout="auto" unmountOnExit={true}>
                    <GridContainer className="userInfoContainer">
                            <GridItem style={{textAlign: "center"}} xs={12} sm={12} md={12}>
                                <p style={{textTransform: "none"}}><Link to="/privacy-policy" style={{color: "#4AA6E5"}}>Click here </Link>to read our <Link to="/privacy-policy" style={{color: "#4AA6E5"}}>Privacy Policy</Link>.</p>
                            </GridItem>
                    </GridContainer>
                </Collapse>
            </div>
        );
    }
}
 
export default PrivacyPolicy;