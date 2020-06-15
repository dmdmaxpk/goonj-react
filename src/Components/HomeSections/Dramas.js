import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';
import Loader from '../Loader/Loader';
import config from '../../Utils/config';

class DramasSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount(){
        this.setState({
            loading: false
        })
    }
    render() {
        let data = this.props.data;
        return (
            <div>
                <Heading heading="Pakistani Dramas" url={`/category/${this.props.category}/page/1`} />
                {data.length > 1 ?
                    <div className="sectionContainers">
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <img className="childImg blockOne" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                <span style={{position: "relative", bottom: "50%", left: "45%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <img className="childImg" src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                                <span style={{position: "relative", bottom: "16vh", left: "45%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                </span>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                                        <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                                        <span style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <img className="childImg dramaBlockFour" src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                                <span style={{position: "relative", bottom: "50%", left: "35%"}}>
                                    <img src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                            </GridItem>

                        </GridContainer>
                    </div>
                : ""}
            </div>
        );
    }
}
 
export default DramasSection;