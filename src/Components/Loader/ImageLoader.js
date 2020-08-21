import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from "react-loader";
import './Loader.scss';
import '../HomeSections/HomeSection.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }
    render() {
        return (
            <div style={{height: "100%"}}>
            <img className={this.props.classnames+" "+"z_index_img"}  src={require('../../Assets/loading_gif.jpg')} />
            <Loader
              loaded={this.state.loaded}
              lines={10}
              length={1}
              width={5}
              radius={12}
              corners={1}
              rotate={0}
              direction={1}
              color="#ffffff"
              speed={1}
              trail={60}
              shadow={false}
              hwaccel={false}
              className="spinner"
              zIndex={2e9}
              top="50%"
              left="50%"
              scale={1.0}
              loadedClassName="loadedContent"
            />
          </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ImageLoader />, rootElement);

