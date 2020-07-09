import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            dob: '',
            email: '',
            phoneNumber: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.saveProfileInfo = this.saveProfileInfo.bind(this);
    }
    componentDidMount(){
        this.getProfileInfo();
    }
    handleChange(e){
        console.log(typeof e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getProfileInfo(){
        let userID = localStorage.getItem('userID');
        AxiosInstance.get(`/user?user_id=${userID}`)
        .then(res =>{
            if(res.data.code === 0){
                let result = res.data.data;
                let date = new Date(result.dateOfBirth)
                date = date.toLocaleDateString();
                this.setState({
                    name: result.fullname,
                    email: result.email,
                    dob: date.toString(),
                    phoneNumber: result.msisdn
                })
            }
        })
    }
    saveProfileInfo(){
        let userID = localStorage.getItem('userID');
        let {name, dob, email} = this.state;
        let info = {
            fullname: name,
            dateOfBirth: dob,
            email
        }
        AxiosInstance.put(`/user?user_id=${userID}`, info)
        .then(res =>{
            alert("Profile Updated!");
        })
        .catch(err =>{
            console.log(err);
        })
    }
    render(){
        return(
            <div>
                <p className="profileHeading">Profile</p>
                <GridContainer className="userInfoContainer">
                    <GridItem xs={6} sm={6} md={6}>
                        <label className="profileLabel">Name</label>
                        <input className="profileInput" type="text" name="name" value={this.state.name} placeholder="Enter your Name" onChange={this.handleChange} />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <label className="profileLabel">Date Of Birth</label>
                        <input className="profileInput" type="text" name="dob" value={this.state.dob} placeholder="mm/dd/yyyy" onChange={this.handleChange} />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <label className="profileLabel">Email Address</label>
                        <input className="profileInput" type="email" name="email" value={this.state.email} placeholder="Enter your E-mail" onChange={this.handleChange} />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <label className="profileLabel">Phone Number</label>
                        <input className="profileInput" type="number" name="phoneNumber" value={this.state.phoneNumber} placeholder="03xxxxxxxxxxx" onChange={this.handleChange} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{textAlign: "center"}}>
                        <button className="profileBtnSubmit" onClick={this.saveProfileInfo}>Submit</button>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
 
export default UserInfo;