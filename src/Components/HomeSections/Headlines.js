import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import config from '../../Utils/config';
import Slider from "react-slick";
import LoaderImage from '../../Components/Loader/ImageLoader'
import Heading from './Heading';
import {Img} from 'react-image'
import './HomeSection.scss';
import '../ListSections/ListSections.scss'
import Loader from '../Loader/Loader';
import AxiosInstance from '../../Utils/AxiosInstance';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

class HeadlinesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
        this.getDate = this.getDate.bind(this);
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
        this.props.history.push({
            pathname: `/${url}`,
            state: {data: item}
          });
    }
    componentDidMount(){
        AxiosInstance.get(`/video?category=${this.props.category}&sub_category=${this.props.subCategory}&limit=${this.props.limit}`)
        .then(res => {
            this.setState({data: res.data});
        })
        .catch(err =>{
    
        });
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    getDate(date){
        let uploadDate = new Date(date);
        uploadDate = uploadDate.toDateString();
        return uploadDate
    }
    render(){
        let data = this.state.data;
        var settings = {
            dots: false,
            arrows: true,
            infinite: this.props.infinite,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 3000,
                  settings: {
                    slidesToShow: 6.4,
                    slidesToScroll: 3,
                    infinite: this.props.infinite,
                    arrow: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                    
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true
                  }
                }
            ]
        };
        return(
            <div className="headlinesContainer">
                <Heading headlineMargin="headlineMargin" heading={this.props.title} url={this.props.url} classes={this.props.classes} viewMoreClass={this.props.viewMoreClass}/>
                        <div className="position-relative">
                            <fadeleftheadline className="headlineLeftFade"/>
                            <Slider className="headlinesSlider" {...settings}>
                            {this.state.data.length > 0 ?  
                                (data.map(item =>
                                        <div className="popularListDiv" onClick={()=> this.handleClick(item)}>
                                            <Link style={{textDecoration: "none", color:"white"}}>
                                                <div style={{position:"relative", marginBottom:"4%"}}>
                                                <Img loader={<LoaderImage classnames="popularListImg" />} className="popularListImg" src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt="thumbnail" />
                                                <Img style={{position:"absolute", left:"43%", bottom:"37%"}} className="headlinesPlayBtn" src={require('../../Assets/playBtn.png')} alt="Play" />
                                                </div>
                                                <div className="freeContentDiv freeContentDivHL">
                                                    <p>FREE</p>
                                                </div>
                                                <p className="headlineTitle">{item.title} | {this.getDate(item.publish_dtm)}</p>
                                                <p className="headnlineSource">{item.source} . <ReactTimeAgo date={item.publish_dtm} /></p>
                                            </Link>
                                        </div>
                                    )
                                )
                                  : <Loader/>
                                }
                            </Slider>
                            <faderightheadline className="headlineRightFade"/>
                            </div>
               
            </div>
        );
    }
}
 
export default withRouter(HeadlinesSection);