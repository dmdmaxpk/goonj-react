
import React, { Component } from 'react'
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import { withRouter } from 'react-router-dom';

class ResponsiveVod extends Component {
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
    removeDescTags(desc){
        let x = desc.split('<');
        let y = x[1].split('>');
        return y[1];
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

            <div onClick={()=> this.handleClick(data[0])}>
            <img className="childImg vod_first_image" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                                <span className="blockOneSpan">
                                    <img src={require('../../Assets/playBtn.png')} className="blockOneImg"/>
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
                                </span>  
            </div>

            <div className="program_lower_4">

                <div onClick={()=> this.handleClick(data[1])}>
                    <img className="drama_pic_responsive_1 " src={`${config.videoLogoUrl}/${data[1].thumbnail}`} />
                    <span  className="play_btn_position2" style={{position: "relative", bottom: "50%", left: "35%"}}>
                        <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "30px"}} />
                </span>
                </div>

                <div onClick={()=> this.handleClick(data[2])}>
                <img className=" drama_pic_responsive_2" src={`${config.videoLogoUrl}/${data[2].thumbnail}`} />
                        <span className="play_btn_position3" style={{position: "relative", bottom: "50%", left: "35%"}}>
                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                        </span>
                </div>

                <div onClick={()=> this.handleClick(data[3])}>
                        <img className="drama_pic_responsive_3 " src={`${config.videoLogoUrl}/${data[3].thumbnail}`} />
                        <span className="play_btn_position4" style={{position: "relative", bottom: "50%", left: "35%"}}>
                            <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "25px"}} />
                        </span>
                </div>

                <div onClick={()=> this.handleClick(data[4])}>
                         <img className="drama_pic_responsive_4 " src={`${config.videoLogoUrl}/${data[4].thumbnail}`} />
                            <span className="play_btn_position5" style={{position: "relative", bottom: "50%", left: "35%"}}>
                                <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                            </span>
                </div>

             </div>
            </div>
        )
    }
}
export default withRouter(ResponsiveVod);