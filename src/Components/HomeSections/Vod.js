import React, { Component } from 'react';
import AxiosInstance from '../../Utils/AxiosInstance';
import Heading from './Heading';
import './HomeSection.scss';
import Loader from '../Loader/Loader';
import {Img} from 'react-image'
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import { withRouter } from 'react-router-dom';
import LoaderImage from '../../Components/Loader/ImageLoader'
import 'bootstrap/dist/css/bootstrap.min.css';

class VodSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.removeDescTags = this.removeDescTags.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    removeDescTags(desc){
        let x = desc.split('<');
        x = String(x[1])
        let y = x.split('>');
        return y[1];
    }
    componentDidMount(){
        AxiosInstance.get(this.props.apiLink)
        .then(res => {
            this.setState({data: res.data});
        })
        .catch(err =>{
            // console.log(err);
        });
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
        const data = this.state.data;
        return (
            <div className={this.props.classname}>
                <Heading heading={this.props.title} url={`/category/${this.props.category}/page/1`} />
                {data.length > 1 ?
                <div className="sectionContainers">
                     <div className="containerO">
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 col-12 padding_5px vodGI vodFirstCol"  onClick={()=> this.handleClick(data[0])}>
                                    <div className="img-box relative_position height-100 ">
                                        <Img loader={<LoaderImage classnames="dramas_image height-100 img_radius" />} className="dramas_image height-100 img_radius" src={`${config.videoLogoUrl}/${data[0].thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                        <span className="play_btn_position1" style={{position: "absolute", bottom: "45%", left: "45%"}}>
                                            <Img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} alt="Play" />
                                        </span>
                                        
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
                                        </div>
                                        <div className="freeContentDiv freeContentDivRH freeContentDivLH">
                                            <p>{data[0].views_count} views</p>
                                        </div>

                                        <div className="blockOneDiv">
                                            <div className="title_and_discription">
                                                <p className="floatLeft marginZero headlineText">{data[0].title}</p>
                                                <p className="floatLeft marginZero categoryText">{this.removeDescTags(data[0].description)}</p>
                                            </div>
                                            <div className="clearfix marginZero publish_date_and_channel">
                                                <p className="floatRight marginZero daysAgoText" ><ReactTimeAgo date={data[0].publish_dtm}/></p>
                                                <p className="floatRight marginZero channelNameText">{data[0].source}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-12 bellow_div_padding" >
                                <div className="row height-100">
                                    <div className="col-lg-8 col-sm-6 col-6">
                                    <div className="row height-100">
                                        <div className="col-lg-12 col-sm-6 col-6 padding_5px vodGI vodSecondCol" onClick={()=> this.handleClick(data[1])}>
                                            <div className="height-100 img-box relative_position square img_padding_2nd">
                                                <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2  content img_radius vod" />}  className="height-100 dramas_image drama_pic_2  content img_radius vod" src={`${config.videoLogoUrl}/${data[1].thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                                <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                                    <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                                </span>
                                                <div className="freeContentDiv freeContentDivRH">
                                                    <p>FREE</p>
                                                </div>
                                                <div className="freeContentDiv freeContentDivRH freeContentDivLH">
                                                    <p>{data[1].views_count} views</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-6 col-6 fill padding_5px vodGI vodSecondCol" onClick={()=> this.handleClick(data[2])}>
                                            <div className="height-100 img-box relative_position square img_padding_3rd">
                                                <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2  content img_radius" />}  className="height-100 dramas_image drama_pic_2  content img_radius" src={`${config.videoLogoUrl}/${data[2].thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                                <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                                    <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                                </span>
                                                <div className="freeContentDiv freeContentDivRH">
                                                    <p>FREE</p>
                                                </div>
                                                <div className="freeContentDiv freeContentDivRH freeContentDivLH">
                                                    <p>{data[2].views_count} views</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>


                                    <div className="col-lg-4 col-sm-6 col-6 ">
                                    <div className="row height-100">
                                    <div className="col-lg-12 col-sm-6 col-6 padding_5px vodGI vod_4th_img" onClick={()=> this.handleClick(data[3])}>
                                        <div className="img-box relative_position square height-100 img_padding_4th">
                                            <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />}  className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[3].thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                            <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                                <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                            </span>
                                            <div className="freeContentDiv freeContentDivRH">
                                                <p>FREE</p>
                                            </div>
                                            <div className="freeContentDiv freeContentDivRH freeContentDivLH">
                                                <p>{data[3].views_count} views</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-6 col-6  vodGI padding_5px vod_5th_img" onClick={()=> this.handleClick(data[4])}>
                                        <div className="img-box relative_position square height-100 img_padding_5th">
                                            <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />}    className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.videoLogoUrl}/${data[4].thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                            <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                                <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                            </span>
                                            <div className="freeContentDiv freeContentDivRH">
                                                <p>FREE</p>
                                            </div>
                                            <div className="freeContentDiv freeContentDivRH freeContentDivLH">
                                                <p>{data[4].views_count} views</p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                </div>
                :
                <Loader/>
                }
            </div>
        );
    }
}
 
export default withRouter(VodSection);