
import React, { Component } from 'react'
import config from '../../Utils/config';
import { withRouter } from 'react-router-dom';

class ResponsiveDramas extends Component {
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

            <div onClick={()=> this.handleClick(data[0])}>
            <img className="childImg blockOne" src={`${config.videoLogoUrl}/${data[0].thumbnail}`} />
                <span className="play_btn_position1" style={{position: "absolute", bottom: "50%", left: "45%"}}>
                    <img className="play_btn_image" src={require('../../Assets/playBtn.png')} style={{width: "50px"}} />
                </span>
            </div>

            <div className="drama_lower_4">

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
export default withRouter(ResponsiveDramas);