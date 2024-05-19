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
        var settings = {
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
        const { isLightTheme } = this.state;

        return (
            <div className={this.props.class}>
                {console.log("This is the name of the class:", this.props.class)}
                <Heading heading={this.props.heading}
                classname={this.props.classname + " " + (this.props.class ? this.props.class : "")} category={this.props.heading} />
                <div className={"channelListContainer channelContainerMargin position-relative " + this.props.pageMargin}>
                    <fadeleft className="channelLeftFade" />
                    <Slider className="channelSlider" {...settings}>
                        {this.state?.data?.map((item, index) => (
                        <div className="channelListDiv" key={index} onClick={() => this.handleItemClick(item)}>
                            <img className="channelListImg" src={item.thumbnail} alt={item?.name} />
                            <p className={`channelListName ${isLightTheme ? 'channelListName_mta2' : ''}`}>{item?.name}</p>
                        </div>
                    ))}
                    </Slider>
                    <faderight className="channelRightFade" />
                </div>
            </div>
        );

    }
}

export default withRouter(DynamicDataList);