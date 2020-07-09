import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loader.scss';

class Loader extends Component {
    state = {  }
    render(){ 
        return(
            <div className="loaderContainer">
                <CircularProgress color={this.props.color} />
            </div>
        );
    }
}
 
export default Loader;