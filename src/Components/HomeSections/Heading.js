import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import './HomeSection.scss';
import { Link } from 'react-router-dom';

class Heading extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLightTheme: false
         }
    }

    componentDidMount (){
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
    }

    render() { 
        const { isLightTheme } = this.state;
        return (
            <div className={`headingGridContainer ${this.props.classes}`}>
                    <div className="heading_container">
                        <div className={ "heading_container " + ( this.props.classname ? this.props.classname : "") }>
                            <div style={{textTransform:"uppercase"}}>
                            {/*  <h4 className="heading_text" >{this.props.category || this.props.heading}</h4>*/}
                             <h4 className={`heading_text ${isLightTheme ? 'heading_text_mta2' : ''}`}>{this.props.category || this.props.heading}</h4>
                            
                            </div>
                            {this.props.url ? 
                                <div className={this.props.viewMoreClass+" homeHeadlineViewMore"}>
                                    {/*<Link className="view_more_text" to={this.props.url}>View More</Link>*/}
                                    <Link className={`view_more_text ${isLightTheme ? 'view_more_text_mta2' : ''}`} to={this.props.url}>View More</Link>
                                </div>
                            :
                                null
                            }
                    </div>
                </div>    
            </div>
        );
    }
}
 
export default Heading;