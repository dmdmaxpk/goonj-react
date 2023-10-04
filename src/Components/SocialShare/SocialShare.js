//SocialShare.js
import React, { Component } from 'react';
import './SocialShare.scss';
import Popover from '@material-ui/core/Popover';
import { Facebook, Twitter, Google, Tumblr, Pinterest, Reddit, Whatsapp, Telegram } from 'react-social-sharing';

class SocialShare extends Component {
    constructor(props){
        super(props);
        this.state = {
            popover: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen(){
        this.setState({
            popover: true
        })
    }
    handleClose(){
        this.setState({
            popover: false
        })
    }
    render(){
        const shareUrl = window.location.href;
        return(
            <div>
                <button id="btnShare" className="shareBtn" onClick={this.handleOpen}>
                    <img src={require('../../Assets/btnBg.png')} alt="share" />
                    <p className="share_text">Share</p>
                </button>
                <Popover
                    id="btnShare"
                    className="sharePopover"
                    open={this.state.popover}
                    anchorEl="btnShare"
                    onClose={this.handleClose}
                    
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    disableScrollLock={true} // Disable the scroll lock
                >
                    <Facebook solid small link={shareUrl}/>
                    <Twitter solid small message="" link={shareUrl}/>
                    <Whatsapp solid small link={shareUrl}/>
                    <Telegram solid small link={shareUrl}/>
                    <Reddit solid small link={shareUrl} style={{background: "red"}} />
                    <Tumblr solid small link={shareUrl}/>
                    <Pinterest solid small link={shareUrl}/>
                    <Google solid small link={shareUrl}/>
                </Popover>
            </div>
        );
    }
}
 
export default SocialShare;