import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    render(){ 
        return(
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
 
export default Feedback;