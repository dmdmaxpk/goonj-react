import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaywallInstance from '../../Utils/PaywallInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import PaginationComponent from '../../Components/Pagination/PaginationComponent'
import Loader from '../../Components/Loader/Loader';
import CategoryDD from '../../Components/VOD/categoryDropdown';
import './vod.scss';
import MainCategory from './MainCategory';
import { trackEvent } from '../../Utils/functions';
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

let count,strURL;
let subCats = ['drama', 'programs', 'digital_world'];

class CategoryVodPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber,
            isPremium: true,
            loading: true,
            isMta: false,
            isLightTheme: false
           
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
        this.getVideos = this.getVideos.bind(this);
    }
    componentDidMount(){
        strURL = window.location.href.split("/");
        count = parseInt(strURL[strURL.length-1]);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.getVideos();

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
    countCheck(value){
        let {history} = this.props;
       if(value==0){
            count--;
            history.push(`/category/${this.props.match.params.category}/page/${count}`);
        } if(value==1){
            count++;
            history.push(`/category/${this.props.match.params.category}/page/${count}`);
        }if(value==2){
            history.push(`/category/${this.props.match.params.category}/page/${1}`);
        }
    }
    getVideos(){
        this.setState({loading: true});
        let apiUrl = `/video?category=${this.props.match.params.category}&limit=${subCats.includes(this.props.match.params.category) ? 1000 : this.state.limit}&skip=${subCats.includes(this.props.match.params.category) ? 0 : this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        let comedyApiUrl = `/video?is_premium=${this.state.isPremium}&category=${this.props.match.params.category}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        PaywallInstance.get(this.props.match.params.category === "comedy" ? comedyApiUrl : apiUrl)
        .then(res =>{
            this.setState({data: res.data, loading: false});
            if(res.data.length < 1){
                this.props.history.push(`/category/${this.props.match.params.category}/page/${1}`);
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber || this.props.match.params.category !== nextProps.match.params.category) {
            this.setState({page: this.props.match.params.pageNumber}, function(){
                this.componentDidMount();
            });
        }
    }
    handleClick(item){
        //let {history} = this.props;
        let url = this.getVodUrl(item.title, item._id);
        console.log("URl: ",url);
        let pathname = `/${url}`;
        let cat = this.props.match.params.category;
        if(cat === "comedy"){
            let permission = localStorage.getItem('CPPermission');
            let Urlmsisdn = localStorage.getItem("urlMsisdn");
            // localStorage.setItem('urlMsisdn', Urlmsisdn);
            permission ? this.props.history.push(`/${url}`) : (Urlmsisdn ? this.props.history.push(`/paywall/comedy?postUrl=${url}&msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}`) : window.location.href = `${config.hepage}?postUrl=${url}`);
        }
        else{ 
            if (this.state.isMta){
                pathname += '?source=mta';
            }
            //history.push(`/${url}`);
            this.props.history.push({
                pathname: pathname,
                state: { data: item }
            });
        }
        //GA4
        console.log("MTA is: ",this.state.isMta);
        if(this.state.isMta){
            console.log("MTA Vod is invoked in CategoryVods!");
            console.log("VOD Channel is: ", pathname);
            //const fullURL = pathname;
            const fullURL = `https://goonj.pk${pathname}`;
            console.log("Vod URL landed on through CategoryVods: ", fullURL);
            // Trigger a custom event with the full URL as the page_location parameter
            console.log(`MTA_VOD_Play event triggered`);
            trackEvent('Custom Event', 'MTA_VOD_Play', fullURL);
        }

    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }

    render(){
        const { isLightTheme } = this.state;
        return(
            <div className="vodCategoryContainer">
                <div>
                    <p style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{((this.props.match.params.category).split('_').join(' ')).toUpperCase()}</p>
                    {this.state.isMta ?
                        null
                    :
                        <CategoryDD category={this.props.match.params.category} />
                    }
                </div>
                {this.state.data.length > 0 && subCats.includes(this.props.match.params.category) ?
                    <>
                        {this.state.isMta ?
                            <div style={{margin: '1vh 1vw'}}>
                                <GoogleAdBanner
                                    adUnitPath="/23081330779/goonj_web_top"
                                    sizes={[[320, 100], [320, 50]]}
                                    divId="div_goonj_web_top"
                                    targeting={{ goonj_section: [this.props?.heading] }}
                                />
                            </div>
                        :
                            null
                        }

                        <MainCategory category={this.props.match.params.category} />
                        
                        {this.state.isMta ?
                            <div style={{margin: '1vh 1vw'}}>
                                <GoogleAdBanner
                                    adUnitPath="/23081330779/div_goonj_web_body"
                                    sizes={[[320, 100], [320, 50]]}
                                    divId="div_goonj_web_body"
                                    targeting={{ goonj_section: [this.props?.heading] }}
                                />
                            </div>
                        :
                            null
                        }
                    </>
                    :
                    <GridContainer>
                        {this.state.loading === false ?
                            <>
                                {this.state.isMta ?
                                    <div style={{margin: '1vh 1vw'}}>
                                        <GoogleAdBanner
                                            adUnitPath="/23081330779/goonj_web_top"
                                            sizes={[[320, 100], [320, 50]]}
                                            divId="div_goonj_web_top"
                                            targeting={{ goonj_section: [this.props?.heading] }}
                                        />
                                    </div>
                                :
                                    null
                                }
                                {this.state.data.map(item =>
                                    <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                        {this.state.data.length!=0?
                                        <div>
                                        <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                            <span className="playBtn">
                                                <img src={require("../../Assets/playBtn.png")} alt="Play" />
                                            </span>
                                            <img src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} className="videoLogo" alt={item.thumbnail} />
                                        </div>
                                        <div className="vodDetailsDiv">
                                            <p className="title" style={{ color: isLightTheme ? "#87CEEB" : "white" }} onClick={()=> this.handleClick(item)}>{item.title}</p>
                                            <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.source} | <ReactTimeAgo className="daysAgo" date={item.publish_dtm}/></Link>
                                            {/* | <font style={{fontSize: "smaller"}}>{item.views_count} views</font> */}
                                            </p>
                                            {/* <p className="daysAgo"><ReactTimeAgo date={item.publish_dtm} /></p> */}
                                        </div></div>
                                        :
                                        ''
                                            }
                                    </GridItem>
                                )}
                                {this.state.isMta ?
                                    <div style={{margin: '1vh 1vw'}}>
                                        <GoogleAdBanner
                                            adUnitPath="/23081330779/div_goonj_web_body"
                                            sizes={[[320, 100], [320, 50]]}
                                            divId="div_goonj_web_body"
                                            targeting={{ goonj_section: [this.props?.heading] }}
                                        />
                                    </div>
                                :
                                    null
                                }
                            </>
                        : <Loader />
                        }
                        <GridItem sm={12} md={12} xs={12} >
                            {
                            this.state.isMta?
                                null
                            :
                                <div className="paginationDiv">
                                    <PaginationComponent params={this.props.match.params} data={this.state.data} />    
                                </div>
                            }
                        </GridItem>
                    </GridContainer>
                }
            </div>
        );
    }
}
 
export default CategoryVodPage;