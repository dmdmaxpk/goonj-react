import React, { Component } from 'react';
import "./Footer.scss";
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render(){
    let date = new Date();
    let year = date.getFullYear();
    return(
      <div className="footer">
          <GridContainer className="footerContainerOne">
          <Hidden mdDown> <GridItem xs={12} sm={12} md={12}>
                <img src={require('../../Assets/logo.png')} />
            </GridItem></Hidden>
          </GridContainer>
          <GridContainer className="footerContainerTwo">
            <GridItem xs={12} sm={12} md={3}>
              <p className="footerHeadings">Goonj Tv</p>
              <p className="footerPs">
                We believe in the changing media consumption 
                landscape where digital content viewing is over-
                taking the traditional terrestrial delivery of video 
                content.
              </p>
              <p className="footerPs">
                We are striving to deliver a digital platform
                where liscensed Live TV, News, Current Affairs
                and Sports are delivered in a personalized
                manner to our users. 
              </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <p className="footerHeadings">Download Our App</p>
              <p className="footerPs">
                Go Mobile with our app.{'\n'}
                Watch your favorite Programs/Sports at just
                one click. 
                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.dmdmax.goonj&hl=en">
                  <font color="#4aa6e5">
                    {" "}Download Now !
                  </font>
                </a>
              </p>
              <a target="_blank" href="https://play.google.com/store/apps/details?id=com.dmdmax.goonj&hl=en">
                <img className="footerPlaystoreImg" src={require('../../Assets/playstore-footer.png')} />
              </a>
            </GridItem>
            <Hidden mdDown>
            <GridItem xs={6} sm={6} md={3}>
              <p className="footerHeadings">Live Channels</p>
              <p className="footerPs">
                <Link style={{color: "white"}} to='/channel/geo-news'>Geo News</Link>{'\n'}
                <Link style={{color: "white"}} to='/channel/samaa-news'>Samaa News</Link>{'\n'}
                <Link style={{color: "white"}} to='/channel/dunya-news'>Dunya TV</Link>{'\n'}
                <Link style={{color: "white"}} to='/channel/cnn'>CNN News</Link>{'\n'}
                <Link style={{color: "white"}} to='/channel/express-news'>Express News</Link>{'\n'}
                <Link style={{color: "white"}} to='/channel/bol-entertainment'>Bol Entertainment</Link>
              </p>
            </GridItem>
            <GridItem xs={6} sm={6} md={3}>
              <p className="footerHeadings">Contact Us</p>
              <GridContainer>
                <GridItem xs={6} sm={6} md={12}>
                  <a href="tel:202-555-0176"><img className="contactUsImg" src={require('../../Assets/call.png')} /></a>
                  <p className="footerPs contactUsPs">
                    Call us :{'\n'}
                    (+1) 202-555-0176, (+1) 2025-5501
                  </p>
                </GridItem>
                <GridItem xs={6} sm={6} md={12}>
                  <a href="mailto:support@goonj.com"><img className="contactUsImg" src={require('../../Assets/email.png')} /></a>
                  <p className="footerPs contactUsPs">
                    Email us :{'\n'}
                    info@goonj.com, support@goonj.com
                  </p>
                </GridItem>
                <GridItem xs={6} sm={6} md={12}>
                  <p className="footerPs followUsP">Follow us : </p>
                  <a href="https://www.facebook.com/GoonjLive/"><img className="contactUsImg" src={require('../../Assets/fb.png')} /></a>
                  <a href=""><img className="contactUsImg" src={require('../../Assets/linkedin.png')} /></a>
                  <a href="https://twitter.com/goonjtv"><img className="contactUsImg" src={require('../../Assets/twitter.png')} /></a>
                </GridItem>
              </GridContainer>
            </GridItem>
            </Hidden>
          </GridContainer>
          <GridContainer className="footerContainerThree">
          <Hidden mdDown> 
            <GridItem xs={12} sm={12} md={12}>
            <p>Copyright &copy; {year} <Link to="/home"><font color="#4aa6e5">GoonjTV</font></Link>. All Rights Reserved.</p>
            </GridItem>
          </Hidden>
          </GridContainer>
      </div>
    );
  }
}
 
export default Footer;