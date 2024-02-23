import React, {Component} from "react";
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from "../Grid/GridItem";
import Loader from '../../Components/Loader/Loader';
import { withRouter } from 'react-router-dom';


class GreenDramas extends Component{
    constructor(props){
    super(props);
    this.state={
        loading:false
    }
}
    render(){
            return(
                <>
                 <GridContainer style={{marginLeft: '-1vw'}}>
                    {this.state.loading === false ?
                    this.props.data.map(item =>
                    <GridItem className="" xs={6} md={6} lg={2}>
                        {this.props.data.length != 0 ?
                        <a style={{textDecoration: "none"}} href={`/green-tv-ent/${item.playlistId}/page/1${this.props.location.search.includes('source=mta') ? '?source=mta' : ''}`} >
                            <div className="imgDiv" >
                                <img src={`https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/Sliders/green-ent-dramas/${item.thumbnail}`} className="videoLogo" alt="" />
                            </div>
                            <div className="" style={{textAlign: 'center'}}>
                                <p className="title" style={{ color: "white" }}>{item.name}</p>
                            </div>
                        </a>
                        :
                        ''
                            }
                    </GridItem>
                )
            : <Loader />
            }
            
        </GridContainer>
        </>
            )
    }
}

export default withRouter(GreenDramas);
        