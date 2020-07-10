import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Heading from './Heading';
import './HomeSection.scss';
import ResponsiveDramas from "../HomeSections/ResponsiveDramas"
import Hidden from '@material-ui/core/Hidden';
import config from '../../Utils/config';
import {Grid} from "@material-ui/core"
import { withRouter } from 'react-router-dom';


class DramasSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    componentDidMount(){
        this.setState({
            loading: false
        })
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
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
        let data = this.props.data;
        return (
            <div>
                <Heading heading="Pakistani Dramas" url={`/category/${this.props.category}/page/1`} />
                {data.length > 1 ?
                    <div className="sectionContainers">
                        <div className="vod_div">
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6} className="vodGI" onClick={()=> this.handleClick(data[0])}>
                                <img className="childImg blockOne" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                <span className="play_btn_position1" style={{position: "relative", bottom: "50%", left: "45%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                            </GridItem>
                            <GridItem xs={3} sm={3} md={4} className="vodGI" onClick={()=> this.handleClick(data[1])}>
                                <img className="childImg drama_pic_2" src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                                <span  className="play_btn_position2" style={{position: "relative", bottom: "16vh", left: "45%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                </span>
                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={6} className="vodGI" onClick={()=> this.handleClick(data[2])}>
                                        <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                                        <span className="play_btn_position3" style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={6} className="vodGI" onClick={()=> this.handleClick(data[3])}>
                                        <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                                        <span className="play_btn_position4" style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                            <GridItem xs={3} sm={3} md={2} className="vodGI" onClick={()=> this.handleClick(data[4])}>
                                <img className="childImg dramaBlockFour" src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                                <span className="play_btn_position5" style={{position: "relative", bottom: "50%", left: "35%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                            </GridItem>

                        </GridContainer>

                        </div>
                        {/* <Grid container spacing={1}>  
                             <Grid item xs={12} lg={6}>
                             <img className="childImg blockOne" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                <span className="play_btn_position1" style={{position: "relative", bottom: "50%", left: "45%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                             </Grid>
                             <Grid item container xs={9} lg={4} spacing={1} justify="center">
                             <Grid item xs={4} lg={12}>
                             <img className="childImg drama_pic_2" src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                                <span  className="play_btn_position2" style={{position: "relative", bottom: "16vh", left: "45%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                </span>
                             </Grid>
                             <Grid item xs={4} lg={6}>
                             <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                                        <span className="play_btn_position3" style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                             </Grid>
                             <Grid item xs={4} lg={6}>
                             <img className="childImg dramaBlockThree" src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                                        <span className="play_btn_position4" style={{position: "relative", bottom: "50%", left: "40%"}}>
                                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                                        </span>
                             </Grid>
                             </Grid>
                             <Grid item xs={3} lg={2}>
                             <img className="childImg dramaBlockFour" src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                                <span className="play_btn_position5" style={{position: "relative", bottom: "50%", left: "35%"}}>
                                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                </span>
                             </Grid>
                        </Grid> */}
                        <div className="responsive_vod_div">
                        <ResponsiveDramas data={data} />
                        </div>
                    </div>
                   
                : ""}
            </div>
        );
    }
}
 
export default withRouter(DramasSection);