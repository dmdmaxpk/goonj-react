import React, {Component} from "react";
import AxiosInstance from "../../Utils/AxiosInstance";
import config from "../../Utils/config";
import Heading from "../HomeSections/Heading";
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';
import { trackEvent } from '../../Utils/functions';
import './ListSections.scss';
import {Link} from 'react-router-dom';
import {Img} from 'react-image'
import LoaderImage from '../../Components/Loader/ImageLoader'
import GoogleAdBanner from "../MTA/GoogleAdBanner";



class DynamicDataList extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data,
            channelClick: false,
            channelMetadata: undefined,
            isMta: false,
            isLightTheme: false,
        };
    }

    componentDidMount() {
        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
        
        if (this.source === 'mta' || this.source === 'mta2') {
            this.setState({ isMta: true });
        } else {
            this.setState({ isMta: false });
        }

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
            this.setState({isLightTheme: false});
        }
    }
    
    // MTA 
    handleItemClick = (item) => {
        if (this.props?.onClick) {
            const redirectUrl = this.props.onClick(item);
            this.props.history.push(redirectUrl);
        } else {
            localStorage.setItem('mta', true);
            const url = `category/${item.category}/page/1?source=mta`;
            this.props.history.push(url);
        }
    };

    render() {
        var verticalSettings = {
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: this.state.data.length > 2 ? 2 : this.state.data.length,
            speed: 500,
            slidesToScroll: 1,

            responsive: [
                {
                    breakpoint: 3000,
                    settings: {
                        slidesToShow: 8.5,
                        slidesToScroll: 3,
                        initialSlide: 0,
                        arrow: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        initialSlide: 0
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        initialSlide: 0,
                        arrows: true
                    }
                }
            ]
        };

        var horizontalSettings = {
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

        return (
            this.props.layout === 'vertical' ?
            <div className={this.props.class}>
                {console.log("This is the name of the class:", this.props.class)}
                <Heading heading={this.props.heading} classname={this.props.classname + " " + (this.props.class ? this.props.class : "")} category={this.props.heading} />
                
                <div style={{margin: '1vh 1vw'}}>
                    <GoogleAdBanner
                        adUnitPath="/23081330779/goonj_web_top"
                        sizes={[[320, 100], [320, 50]]}
                        divId="div_goonj_web_top"
                        targeting={{ goonj_section: [this.props?.heading] }}
                    />
                </div>
                
                <div className={"channelListContainer channelContainerMargin position-relative " + this.props.pageMargin}>
                    <fadeleft className="channelLeftFade" />
                    <Slider className="channelSlider" {...verticalSettings}>
                        {this.state?.data?.map((item, index) => (
                        <div className="channelListDiv" key={index} onClick={() => this.handleItemClick(item)}>
                            <img className="channelListImg" src={item.thumbnail} alt={item?.name} />
                            <p className={`channelListName ${isLightTheme ? 'channelListName_mta2' : ''}`}>{item?.name}</p>
                        </div>
                    ))}
                    </Slider>
                    <faderight className="channelRightFade" />
                </div>

                
                <div style={{margin: '1vh 1vw'}}>
                    <GoogleAdBanner
                        adUnitPath="/23081330779/goonj_web_body"
                        sizes={[[320, 100], [320, 50]]}
                        divId="div_goonj_web_body"
                        targeting={{ goonj_section: [this.props?.heading] }}
                    />
                </div>
            </div>
            :
            <div className="headlinesContainer">
                <Heading headlineMargin="headlineMargin" heading={this.props.heading} url={this.props.url} classes={this.props.classes} viewMoreClass={this.props.viewMoreClass}/>
                    <div style={{margin: '1vh 1vw'}}>
                        <GoogleAdBanner
                            adUnitPath="/23081330779/goonj_web_top"
                            sizes={[[320, 100], [320, 50]]}
                            divId="div_goonj_web_top"
                            targeting={{ goonj_section: [this.props?.heading] }}
                        />
                    </div>

                    <div className="position-relative">
                        <fadeleftheadline className="headlineLeftFade"/>
                        <Slider className="headlinesSlider" {...horizontalSettings}>
                        {this.state.data.length > 0 ?  
                            (this.state.data.map(item =>
                                    <div className="popularListDiv" onClick={()=> this.handleItemClick(item)}>
                                        <Link style={{textDecoration: "none", color:"white"}}>
                                            <div style={{position:"relative", marginBottom:"4%"}}>
                                            <Img loader={<LoaderImage classnames="popularListImg" />} className="popularListImg" src={item.thumbnail} alt={item?.name} />
                                            <Img style={{position:"absolute", left:"43%", bottom:"37%"}} className="headlinesPlayBtn" src={require('../../Assets/playBtn.png')} alt="Play" />
                                            </div>
                                            {(!this.state.isMta && !isLightTheme) && (
                                                <div className="freeContentDiv freeContentDivHL">
                                                    <p>FREE</p>
                                                </div>
                                            )}

                                            <p className="headlineTitle" style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.name}</p>
                                            {/* <p className="headnlineSource" style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.source} . <ReactTimeAgo date={item.publish_dtm} /></p> */}
                                        </Link>
                                    </div>
                                )
                            )
                                : <Loader/>
                            }
                        </Slider>
                        <faderightheadline className="headlineRightFade"/>
                    </div>

                    <div style={{margin: '1vh 1vw'}}>
                        <GoogleAdBanner
                            adUnitPath="/23081330779/goonj_web_body"
                            sizes={[[320, 100], [320, 50]]}
                            divId="div_goonj_web_body"
                            targeting={{ goonj_section: [this.props?.heading] }}
                        />
                    </div>
            </div>
                )
        

    }
}

export default withRouter(DynamicDataList);