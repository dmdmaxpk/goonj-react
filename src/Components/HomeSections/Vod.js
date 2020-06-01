import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';

class VodSection extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() {
        return (
            <div className="sectionContainers">
                <Heading heading={this.props.title} />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <div>
                            <img className="childImg" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                            <span className="blockOneSpan">
                                <img src={require('../../Assets/playBtn.png')} className="blockOneImg"/>
                                <div className="blockOneDiv">
                                    <p className="floatLeft marginZero headlineText">Psl 5 ki iftitahi taqreeb!</p>
                                    <p className="floatRight marginZero daysAgoText" >2 days ago</p>
                                    <div className="clearfix marginZero"/>
                                    <p className="floatLeft marginZero categoryText">Psl 5 ki iftitahi tarqreeb aaj Karachi me shaam ho</p>
                                    <p className="floatRight marginZero channelNameText">Express news</p>
                                </div>
                            </span>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <img className="childImg blockTwo" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                                <span className="blockTwoSpan">
                                    <img src={require('../../Assets/playBtn.png')} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <img className="childImg blockTwo" src="https://unsplash.com/photos/5Oe8KFH5998/download" />
                                <span className="blockTwoSpan">
                                    <img src={require('../../Assets/playBtn.png')} />
                                </span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <img className="childImg blockThree" src="https://imagevars.gulfnews.com/2020/03/11/Reader-picture_170c9c693f4_original-ratio.jpg" />
                                <span className="blockThreeSpan">
                                    <img src={require('../../Assets/playBtn.png')} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <img className="childImg blockThree" src="https://imagevars.gulfnews.com/2020/03/11/Reader-picture_170c9c693f4_original-ratio.jpg" />
                                <span className="blockThreeSpan">
                                    <img src={require('../../Assets/playBtn.png')} />
                                </span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }
}
 
export default VodSection;