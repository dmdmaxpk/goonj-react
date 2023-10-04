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
            data: [],
            isMta: false,
            isLightTheme: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
        this.getDate = this.getDate.bind(this);
    }
    handleClick(item) {
        let url = this.getVodUrl(item.title, item._id);
    
        // Check if isLightTheme is true, and conditionally modify the pathname
        let pathname = `/${url}`;
        if (this.state.isLightTheme) {
            pathname += '?source=mta2';
        }
        if (this.state.isMta){
            pathname += '?source=mta';
        }
    
        this.props.history.push({
            pathname: pathname,
            state: { data: item }
        });
    }

    componentDidMount(){
        AxiosInstance.get(`/video?category=${this.props.category}&sub_category=${this.props.subCategory}&limit=${this.props.limit}`)
        .then(res => {
            this.setState({data: res.data});
        })
        .catch(err =>{
    
        });

        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
            this.setState({isLightTheme: false});
        }

        // mta check
        if(this.source === 'mta'){
            this.setState({isMta: true});
        }
        else{
            this.setState({isMta: false});
        }

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

        const { isLightTheme } = this.state;
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
                                                <p className="headlineTitle" style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.title} | {this.getDate(item.publish_dtm)}</p>
                                                <p className="headnlineSource" style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.source} . <ReactTimeAgo date={item.publish_dtm} /></p>
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