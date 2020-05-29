import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';

class ProgramsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() {
        return (
            <div className="sectionContainers">
                <Heading heading="Programs" />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <img className="childImg" src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-batman.jpg" />
                        <span style={{position: "relative", bottom: "50%", left: "45%"}}>
                            <img src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                        </span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {/* <img className="childImg" src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-batman.jpg" /> */}
                        {/* <span style={{position: "relative", bottom: "45%", left: "45%"}}> */}
                            {/* <img src={require('../../Assets/playBtn.png')} style={{width: "40px", position: "relative", bottom: "45%", left: "45%"}} /> */}
                        {/* </span> */}
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <img style={{width:"100%", height:"123px"}} className="childImg" src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-batman.jpg" />
                                <span style={{position: "relative", bottom: "50%", left: "45%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <img style={{width:"100%", height:"123px"}} className="childImg" src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-batman.jpg" />
                                <span style={{position: "relative", bottom: "50%", left: "45%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <img style={{width:"90%", height:"123px"}} className="childImg" src="https://lh3.googleusercontent.com/proxy/oCdFX3v_AZo6BAhkuaUdXFnX83E5GsxjD182GmN_MCB3ZSBtclvczdurYbKZmbuPxlYkKCpC7JHN6D_6arHu5rEwWRK97eNuM2aswFKTbApi47NI" />
                                <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <img style={{width:"90%", height:"123px"}} className="childImg" src="https://lh3.googleusercontent.com/proxy/oCdFX3v_AZo6BAhkuaUdXFnX83E5GsxjD182GmN_MCB3ZSBtclvczdurYbKZmbuPxlYkKCpC7JHN6D_6arHu5rEwWRK97eNuM2aswFKTbApi47NI" />
                                <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }
}
 
export default ProgramsSection;