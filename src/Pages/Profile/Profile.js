import React, { Component } from 'react';
import UserInfo from './UserInfo';

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
                <UserInfo />
                <Divider />
            </div>
        );
    }
}
 
export default Profile;