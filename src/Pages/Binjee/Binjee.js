import React, { Component } from 'react';
import './Binjee.scss';

class Binjee extends Component {
    state = {}
    render(){ 
        return(
            <iframe
                src="https://goonj.binjee.com/"
                className="iframe"
                allowfullscreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                >
            </iframe>
        );
    }
}
 
export default Binjee;