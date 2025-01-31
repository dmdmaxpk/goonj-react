import React, { Component } from 'react';
import {Img} from 'react-image'
import Heading from './Heading';
import './HomeSection.scss';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import LoaderImage from '../../Components/Loader/ImageLoader'
import Loader from '../../Components/Loader/Loader';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class DramasSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    componentDidMount(){
        this.setState({
            loading: false
        })
        AxiosInstance.get(`/subcategory?category_name=${this.props.category}`)
        .then(res => {
            let reversedData = res.data.reverse();
            this.setState({data: reversedData});
        })
        .catch(err =>{
            // console.log(err);
        });
    }
    // handleClick(item){
    //     let url = this.getVodUrl(item.title, item._id);
    //     this.props.history.push({
    //         pathname: `/${url}`,
    //         state: {data: item}
    //       });
    // }
    handleClick(item){
        this.props.history.push(`/category/${item.category_name}/${item.name}/page/1`)
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    render() {
        let data = this.state.data;
        return (
            // <div className="dramaMainDivMargin">
            //     <Heading heading={this.props.title} url={`/category/${this.props.category}/page/1`} />
            //     {data.length > 1 ?
            //         <div className="sectionContainers">
            //             <div className="containerO">
            //                 <div className="row">
            //                     <div className="col-lg-6 padding_5px vodGI"  onClick={()=> this.handleClick(data[0])}>
            //                     <div className="img-box relative_position height-100 ">
            //                         <Img loader={<LoaderImage classnames="dramas_image height-100 img_radius"/>} className="dramas_image height-100 img_radius" src={`${config.dramaLogoUrl}/${data[0].name}.jpg`} alt="thumbnail" />
            //                             <span className="play_btn_position1" style={{position: "absolute", bottom: "40%", left: "45%"}}>
            //                                 <Img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} alt="Play" />
            //                             </span>
                                        
            //                             <div className="freeContentDiv freeContentDivRH">
            //                                 <p style={{color:"white"}}>FREE</p>
            //                             </div>
            //                     </div>
            //                     </div>
            //                     <div className="col-lg-6" >
            //                     <div className="row height-100">
            //                         <div className="col-lg-8 col-sm-9 col-9">
            //                         <div className="row height-100">
            //                             <div className="col-lg-12 col-sm-4 col-4 padding_5px vodGI " onClick={()=> this.handleClick(data[1])}>
            //                         <div className="img-box relative_position square ">
            //                             <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />} className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.dramaLogoUrl}/${data[1].name}.jpg`} alt="thumbnail" />
            //                             <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
            //                                 <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
            //                             </span>
                                        
            //                             <div className="freeContentDiv freeContentDivRH">
            //                                 <p>FREE</p>
            //                             </div>
            //                         </div>
            //                             </div>
            //                             <div className="col-lg-6 col-sm-4 col-4 fill padding_5px vodGI" onClick={()=> this.handleClick(data[2])}>
            //                         <div className="img-box relative_position square height-100">
            //                             <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />} className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.dramaLogoUrl}/${data[2].name}.jpg`} alt="thumbnail" />
            //                             <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
            //                                 <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
            //                             </span>
            //                             <div className="freeContentDiv freeContentDivRH">
            //                                 <p>FREE</p>
            //                             </div>
            //                         </div>
            //                             </div>
            //                             <div className="col-lg-6 col-sm-4 col-4 padding_5px vodGI" onClick={()=> this.handleClick(data[3])}>
            //                         <div className="img-box relative_position square height-100">
            //                             <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />} className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.dramaLogoUrl}/${data[3].name}.jpg`} alt="thumbnail" />
            //                                    <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
            //                                   <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
            //                              </span>
            //                             <div className="freeContentDiv freeContentDivRH">
            //                                 <p>FREE</p>
            //                             </div>
            //                         </div>
            //                             </div>
            //                         </div>
            //                         </div>
            //                         <div className="col-lg-4 col-sm-3 col-3 padding_5px vodGI" onClick={()=> this.handleClick(data[4])}>
            //                         <div className="img-box relative_position square height-100">
            //                             <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius yoo" />} className="height-100 dramas_image drama_pic_2 content img_radius " src={`${config.dramaLogoUrl}/${data[4].name}.jpg`} alt="thumbnail" />
            //                             <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
            //                                 <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
            //                             </span>
            //                             <div className="freeContentDiv freeContentDivRH">
            //                                 <p>FREE</p>
            //                             </div>
            //                         </div>
            //                         </div>
            //                     </div>
            //                     </div>
            //                 </div>
            //                 </div>
            //         </div>
            <div className={this.props.classname}>
            <Heading heading={this.props.title} url={`/category/${this.props.category}/page/1`} />
            {data.length > 1 ?
                <div className="sectionContainers">
                    <div className="containerO">
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 col-12 padding_5px vodGI vodFirstCol"  onClick={()=> this.handleClick(data[0])}>
                                <div className="img-box relative_position height-100 ">
                                    <Img loader={<LoaderImage classnames="dramas_image height-100 img_radius" />} className="dramas_image height-100 img_radius" src={`${config.dramaLogoUrl}/${data[0].name}.jpg`} alt="thumbnail" />
                                        <span className="play_btn_position1" style={{position: "absolute", bottom: "45%", left: "45%"}}>
                                            <Img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} alt="Play" />
                                        </span>
                                        
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
                                        </div>
                                </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-12 bellow_div_padding" >
                                <div className="row height-100">
                                    <div className="col-lg-8 col-sm-6 col-6">
                                    <div className="row height-100">
                                        <div className="col-lg-12 col-sm-6 col-6 padding_5px vodGI vodSecondCol" onClick={()=> this.handleClick(data[1])}>
                                        <div className="height-100 img-box relative_position square img_padding_2nd">
                                        <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2  content img_radius vod" />}  className="height-100 dramas_image drama_pic_2  content img_radius vod" src={`${config.dramaLogoUrl}/${data[1].name}.jpg`} alt="thumbnail" />
                                        <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                            <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                        </span>
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
                                        </div>

                                        </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-6 col-6 fill padding_5px vodGI vodSecondCol" onClick={()=> this.handleClick(data[2])}>
                                        <div className="height-100 img-box relative_position square img_padding_3rd">
                                        <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2  content img_radius" />}  className="height-100 dramas_image drama_pic_2  content img_radius" src={`${config.dramaLogoUrl}/${data[2].name}.jpg`} alt="thumbnail" />
                                        <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                            <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                        </span>
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>


                                    <div className="col-lg-4 col-sm-6 col-6 ">
                                    <div className="row height-100">
                                    <div className="col-lg-12 col-sm-6 col-6 padding_5px vodGI vod_4th_img" onClick={()=> this.handleClick(data[3])}>
                                        <div className="img-box relative_position square height-100 img_padding_4th">
                                        <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />}  className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.dramaLogoUrl}/${data[3].name}.jpg`} alt="thumbnail" />
                                        <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                            <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                        </span>
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
                                        </div>
                                        </div>
                                        </div>
                                    <div className="col-lg-12 col-sm-6 col-6  vodGI padding_5px vod_5th_img" onClick={()=> this.handleClick(data[4])}>
                                    <div className="img-box relative_position square height-100 img_padding_5th">
                                        <Img loader={<LoaderImage classnames="height-100 dramas_image drama_pic_2 content img_radius" />}    className="height-100 dramas_image drama_pic_2 content img_radius" src={`${config.dramaLogoUrl}/${data[4].name}.jpg`} alt="thumbnail" />
                                        <span  className="play_btn_position2" style={{position: "absolute", bottom: "40%", left: "45%"}}>
                                            <Img className="play_btn_image2" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} alt="Play" />
                                        </span>
                                        <div className="freeContentDiv freeContentDivRH">
                                            <p>FREE</p>
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
                   
                : <Loader />
                }

            </div>
        );
    }
}
 
export default withRouter(DramasSection);