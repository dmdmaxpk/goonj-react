import React, { Component } from 'react';
import "./Footer.scss";
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

class Footer extends Component {
  render(){
    let date = new Date();
    let year = date.getFullYear();
    return(
      <div className="footer">
          <GridContainer className="footerContainerOne">
            <GridItem xs={12} sm={12} md={12}>
                <img src={require('../../Assets/logo.png')} />
            </GridItem>
          </GridContainer>
          <GridContainer className="footerContainerTwo">
            <GridItem xs={6} sm={6} md={3}>
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
            <GridItem xs={6} sm={6} md={3}>
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
            <GridItem xs={6} sm={6} md={3}>
              <p className="footerHeadings">Live Channels</p>
              <p className="footerPs">
                PSL Live TV{'\n'}
                Geo News{'\n'}
                Samaa News{'\n'}
                Dunya TV{'\n'}
                CNN News{'\n'}
                Express News{'\n'}
                Bol Entertainment
              </p>
            </GridItem>
            <GridItem xs={6} sm={6} md={3}>
              <p className="footerHeadings">Contact Us</p>
              <GridContainer>
                <GridItem xs={6} sm={6} md={12}>
                  <img className="contactUsImg" src={require('../../Assets/call.png')} />
                  <p className="footerPs contactUsPs">
                    Call us :{'\n'}
                    (+1) 202-555-0176, (+1) 2025-5501
                  </p>
                </GridItem>
                <GridItem xs={6} sm={6} md={12}>
                  <img className="contactUsImg" src={require('../../Assets/email.png')} />
                  <p className="footerPs contactUsPs">
                    Email us :{'\n'}
                    info@goonj.com, support@goonj.com
                  </p>
                </GridItem>
                <GridItem xs={6} sm={6} md={12}>
                  <p className="footerPs followUsP">Follow us : </p>
                  <img className="contactUsImg" src={require('../../Assets/fb.png')} />
                  <img className="contactUsImg" src={require('../../Assets/linkedin.png')} />
                  <img className="contactUsImg" src={require('../../Assets/twitter.png')} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <GridContainer className="footerContainerThree">
            <GridItem xs={12} sm={12} md={12}>
              <p>Copyright &copy; {year} <font color="#4aa6e5">GoonjTV</font>. All Rights Reserved.</p>
            </GridItem>
          </GridContainer>
      </div>
    );
  }
}
 
export default Footer;