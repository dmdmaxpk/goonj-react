import React, { Component } from 'react';
import $ from 'jquery';


class PosterSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
    }
    render(){ 
        return(
            <div className="posterSlider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner carouselDiv">
                        <div className="carousel-item active">
                        <img src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-batman.jpg" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://cdn.collider.com/wp-content/uploads/2012/05/dark-knight-rises-movie-poster-banner-catwoman.jpg" className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://www.itl.cat/pngfile/big/209-2097310_batman-vs-superman-hd.jpg" className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                    {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a> */}
                </div>
            </div>
        );
    }
}
 
export default PosterSlider;