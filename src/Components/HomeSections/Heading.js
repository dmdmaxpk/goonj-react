import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import './HomeSection.scss';
import { Link } from 'react-router-dom';

class Heading extends Component {
    render() { 
        return (
            <GridContainer className="headingGridContainer">
                {/* <GridItem xs={10} sm={8} md={8}>
                    <div style={{float:"left", textTransform:"uppercase"}}>
                        <h4 style={{fontWeight: "900"}}>{this.props.heading}</h4>
                    </div>
                 
                </GridItem>
                <GridItem xs={2}>
                <div className="viewMore" style={{float:"right", fontSize:"small", marginRight:"15px", marginTop:"15px"}}>
                        <Link to={this.props.url}>View More</Link>
                    </div>
                    </GridItem> */}
                    <div className="heading_container">
                    <div style={{textTransform:"uppercase"}}>
                        <h4 className="heading_text" >{this.props.heading}</h4>
                    </div>
                    <div className={this.props.viewMoreClass}>
                    <Link className="view_more_text" to={this.props.url}>View More</Link>
                    </div>
                    </div>
            </GridContainer>
        );
    }
}
 
export default Heading;