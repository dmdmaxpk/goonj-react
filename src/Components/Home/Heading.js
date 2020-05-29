import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import './HomeSection.scss';
import { Link } from 'react-router-dom';

class Heading extends Component {
    render() { 
        return (
            <GridContainer style={{color:"white", marginBottom:"10px"}}>
                <GridItem xs={12} sm={12} md={12}>
                    <div style={{float:"left", textTransform:"uppercase"}}>
                        <h4>{this.props.heading}</h4>
                    </div>
                    <div style={{float:"right", fontSize:"small", marginRight:"15px", marginTop:"15px"}}>
                        <Link>View More</Link>
                    </div>
                </GridItem>
            </GridContainer>
        );
    }
}
 
export default Heading;