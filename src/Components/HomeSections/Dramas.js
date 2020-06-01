import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';

class DramasSection extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() {
        return (
            <div className="sectionContainers">
                <Heading heading="Pakistani Dramas" />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <img className="childImg" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                        <span style={{position: "relative", bottom: "50%", left: "45%"}}>
                            <img src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                        </span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img className="childImg" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                        {/* <span style={{position: "relative", bottom: "45%", left: "45%"}}> */}
                            {/* <img src={require('../../Assets/playBtn.png')} style={{width: "40px", position: "relative", bottom: "45%", left: "45%"}} /> */}
                        {/* </span> */}
                        <GridContainer style={{marginTop: "15px"}}>
                            <GridItem xs={12} sm={12} md={6}>
                                <img className="childImg" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                                <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <img className="childImg" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                                <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                </span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <img style={{overflowY: "hidden", height: "78%", width: "90%"}} className="childImg" src="https://cdn.collider.com/wp-content/uploads/2013/06/man-of-steel-poster-general-zod.jpg" />
                        <span style={{position: "relative", bottom: "50%", left: "35%"}}>
                            <img src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                        </span>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }
}
 
export default DramasSection;