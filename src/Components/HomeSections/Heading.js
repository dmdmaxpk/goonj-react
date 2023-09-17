import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import './HomeSection.scss';
import { Link } from 'react-router-dom';

class Heading extends Component {
    render() { 
        return (
            <div className={`headingGridContainer ${this.props.classes}`}>
                    <div className="heading_container">
                        <div className={ "heading_container " + ( this.props.classname ? this.props.classname : "") }>
                            <div style={{textTransform:"uppercase"}}>
                             <h4 className="heading_text" >{this.props.category}</h4>
                            </div>
                            <div className={this.props.viewMoreClass+" homeHeadlineViewMore"}>
                            <Link className="view_more_text" to={this.props.url}>View More</Link>
                            </div>
                         </div>
                    </div>
            </div>
        );
    }
}
 
export default Heading;