import React, { Component } from 'react';

class Binjee extends Component {
    state = {}
    render(){ 
        return(
            <iframe
                src="https://goonj.binjee.com/"
                style={{maxWidth:"100vw !important", width: "100vw", height: "100vh"}}
                allowfullscreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                >
            </iframe>
        );
    }
}
 
export default Binjee;