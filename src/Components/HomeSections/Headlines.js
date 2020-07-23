import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import config from '../../Utils/config';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from './Heading';
import './HomeSection.scss';
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
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        // console.log(url);
        return url;
    }
    getDate(date){
        let uploadDate = new Date(date);
        uploadDate = uploadDate.toDateString();
        return uploadDate
    }
    render(){
        let data = this.props.data;
        // console.log(data);
        var settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 3000,
                  settings: {
                    slidesToShow: 5.25,
                    slidesToScroll: 3,
                    infinite: true,
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
                <Heading heading={this.props.title} url={`/category/${this.props.category}/page/1`} />
                <div>
                    <Slider className="headlinesSlider" {...settings}>
                        {data.map(item =>
                                <div className="popularListDiv" key onClick={()=> this.handleClick(item)}>
                                    <Link style={{textDecoration: "none", color:"white"}}>
                                        <div style={{position:"relative", marginBottom:"4%"}}>
                                        <img className="popularListImg" src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} />
                                        <img style={{position:"absolute", left:"40%", bottom:"35%"}} className="headlinesPlayBtn" src={require('../../Assets/playBtn.png')} />
                                        </div>
                                        <p className="headlineTitle">{item.title} | {this.getDate(item.publish_dtm)}</p>
                                        <p className="headnlineSource">{item.source} . {item.views_count} views . <ReactTimeAgo date={item.publish_dtm} /></p>
                                    </Link>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            </div>
        );
    }
}
 
export default withRouter(HeadlinesSection);