import React, { Component } from 'react';


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
                        {/* <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li> */}
                    </ol>
                    <div className="carousel-inner carouselDiv">
                        <div className="carousel-item active">
                        <img src="https://reacttive.com/img/psl/reacttive-pakistan-super-league-1.jpg" className="d-block w-100 slider_images_all" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://reacttive.com/img/psl/reacttive-pakistan-super-league-2.jpg" className="d-block w-100 slider_images_all" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://reacttive.com/img/psl/reacttive-pakistan-super-league-3.jpg" className="d-block w-100 slider_images_all" alt="Third slide" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://reacttive.com/img/psl/reacttive-pakistan-super-league-4.jpg" className="d-block w-100 slider_images_all" alt="Fourth slide" />
                        </div>
                        <div className="carousel-item">
                        <img src="https://reacttive.com/img/psl/reacttive-pakistan-super-league-5.jpg" className="d-block w-100 slider_images_all" alt="Fifth slide" />
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