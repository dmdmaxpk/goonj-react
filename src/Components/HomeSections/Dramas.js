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
import 'bootstrap/dist/css/bootstrap.min.css';


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
                        <div className="containerO">
                            <div className="row">
                                <div className="col-md-6 padding_5px vodGI"  onClick={()=> this.handleClick(data[0])}>
                                <div className="img-box relative_position height-100 ">
                                    <img className="dramas_image height-100 img_radius" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                        <span className="play_btn_position1" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                                        </span>
                                </div>
                                </div>
                                <div className="col-md-6" >
                                <div className="row height-100">
                                    <div className="col-md-8 col-sm-9 col-9">
                                    <div className="row height-100">
                                        <div className="col-md-12 col-sm-4 col-4 padding_5px vodGI" onClick={()=> this.handleClick(data[1])}>
                                        <div className="img-box relative_position square ">
                                        <img className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                                               <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                              <img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                         </span>
                                        </div>
                                        </div>
                                        <div className="col-md-6 col-sm-4 col-4 fill padding_5px vodGI" onClick={()=> this.handleClick(data[2])}>
                                        <div className="img-box relative_position square height-100">
                                        <img className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                                               <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                              <img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                         </span>
                                        </div>
                                        </div>
                                        <div className="col-md-6 col-sm-4 col-4 padding_5px vodGI" onClick={()=> this.handleClick(data[3])}>
                                        <div className="img-box relative_position square height-100">
                                        <img className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                                               <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                              <img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                         </span>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-4 col-sm-3 col-3 padding_5px vodGI" onClick={()=> this.handleClick(data[4])}>
                                    <div className="img-box relative_position square height-100">
                                        <img className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                                               <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                              <img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                                         </span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                   
                : ""}
            </div>
        );
    }
}
 
export default withRouter(DramasSection);