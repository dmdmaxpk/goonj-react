import { Button, Grid, Hidden } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { Component } from 'react';
import "./StickyBanner.scss";

class StickyBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: true
        }
    }
    componentDidMount(){
        sessionStorage.setItem('playStoreBanner', true);
    }
    redirectToPlayStore = () => {
        window.open(this.props.appLink, "_blank");
    }
    closeBanner = () => {
        sessionStorage.setItem('playStoreBanner', false);
        this.setState({display: false});
    }

    render(){
        const bannerSessionState = sessionStorage.getItem('playStoreBanner') ? Boolean(sessionStorage.getItem('playStoreBanner')) : true;
        return(
            this.state.display && bannerSessionState ? 
                <Hidden mdUp>
                    <Grid className='stickyBannerContainer' container>
                        <Grid className='sbLogoGrid' xs={4} sm={4} md={4} lg={4} item>
                            <img className='centerElementVertical sbLogoImg' src={this.props.imgSource} />
                        </Grid>
                        <Grid xs={4} sm={4} md={4} lg={4} item>
                            <p>Install our app for a better experience</p>
                        </Grid>
                        <Grid className="sbBtnGrid" xs={4} sm={4} md={4} lg={4} item>
                            <Button variant="contained" color="primary" className="sbBtn centerElementVertical" onClick={this.redirectToPlayStore}>Install</Button>
                        </Grid>
                        <div className='sbCloseDiv'>
                            <Close className='sbCloseIcon' onClick={this.closeBanner}/>
                        </div>
                    </Grid>
                </Hidden>
            :
            ''
        )
    }
}

export default StickyBanner;