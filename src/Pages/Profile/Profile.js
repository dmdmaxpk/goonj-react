import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Unsub from './Unsub';
import './Profile.scss';
import { Divider } from '@material-ui/core';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){
        return(
            <div className="profileContainer">
                <p className="profilePageHead">Profile</p>
                <UserInfo />
                <Divider />
                <Unsub />
                <Divider />
            </div>
        );
    }
}
 
export default Profile;