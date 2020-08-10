import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import './HomeSection.scss';
import { Link } from 'react-router-dom';

class Heading extends Component {
    render() { 
        return (
            <GridContainer className="headingGridContainer">
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