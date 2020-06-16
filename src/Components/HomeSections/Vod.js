import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import { withRouter } from 'react-router-dom';

class VodSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
        this.removeDescTags = this.removeDescTags.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    removeDescTags(desc){
        let x = desc.split('<');
        let y = x[1].split('>');
        return y[1];
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
        console.log("url", url);
        this.props.history.push({
            pathname: `/${url}`,
            state: {data: item}
          });
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    render() {
        const data = this.props.data.length > 0 ? this.props.data : '';
        console.log(data.length > 1 ? `${config.videoLogoUrl}/${data[0].thumbnail}` : '');
        return (
            <div className={this.props.classname}>
                <Heading heading={this.props.title} url={`/category/${this.props.category}/page/1`} />
                {data.length > 1 ?
                <div className="sectionContainers">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6} className="vodGI" onClick={()=> this.handleClick(data[0])}>
                            <div>
                                <img className="childImg blockOne" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                <span className="blockOneSpan">
                                    <img src={require('../../Assets/playBtn.png')} className="blockOneImg"/>
                                    <div className="blockOneDiv">
                                        <p className="floatLeft marginZero headlineText">{data[0].title}</p>
                                        <p className="floatRight marginZero daysAgoText" ><ReactTimeAgo date={data[0].publish_dtm}/></p>
                                        <div className="clearfix marginZero"/>
                                        <p className="floatLeft marginZero categoryText">{this.removeDescTags(data[0].description)}</p>
                                        <p className="floatRight marginZero channelNameText">{data[0].source}</p>
                                    </div>
                                </span>
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12} className="vodGI" onClick={()=> this.handleClick(data[1])}>
                                    <img className="childImg blockTwo" src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                                    <span className="blockTwoSpan">
                                        <img src={require('../../Assets/playBtn.png')} />
                                    </span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="vodGI" onClick={()=> this.handleClick(data[2])}>
                                    <img className="childImg blockTwo" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                                    <span className="blockTwoSpan">
                                        <img src={require('../../Assets/playBtn.png')} />
                                    </span>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12} className="vodGI" onClick={()=> this.handleClick(data[3])}>
                                    <img className="childImg blockThree" src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                                    <span className="blockThreeSpan">
                                        <img src={require('../../Assets/playBtn.png')} />
                                    </span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="vodGI" onClick={()=> this.handleClick(data[4])}>
                                    <img className="childImg blockThree" src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                                    <span className="blockThreeSpan">
                                        <img src={require('../../Assets/playBtn.png')} />
                                    </span>
                                </GridItem>
                            </GridContainer>
                        </GridItem>

                    </GridContainer>
                </div>
                :
                ''
                }
            </div>
        );
    }
}
 
export default withRouter(VodSection);