//MTA.js
import React from 'react';
import './MTA.css';
import Slider from "react-slick";
import ReactGA from 'react-ga';

ReactGA.initialize('G-2TG6PV2GL9')

const API_URL = 'https://api.goonj.pk/v2/live';
const IMAGE_PATH = "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/web-thumb/";
const FREE_CHANNELS = ['film-world','ltn-family','aplus','a1-entertainment','Aruj-tv','city-42','mashriq-tv','makkah-live','madina-live','dawn-news','pnn-news','24_news','neo-news','gtv-news','suchtv-news','aaj-news','express-entertainment'];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      channelClick: false,
      channelMetadata: undefined,
    };
  }

  fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      const filteredItems = jsonData.filter(item => FREE_CHANNELS.includes(item.slug));
      this.setState({ data: filteredItems });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  componentDidMount = () => {
    this.fetchData();
  }

  handleItemClick = (item) => {
    console.log('Channel is:', item);
    this.setState({ channelMetadata: item, channelClick: true });
    
    // Create custom events for MTA channels
    console.log(`MTA-${item.slug} event triggered`);
    ReactGA.event({
       category: 'Custom Event',
       action: `MTA_${item.slug}`,
       label: window.location.href // Include the page location in the 'label' parameter
     });

    console.log('HandleRedirect - MTA.js');
    localStorage.setItem('mta', true);
    let url = `/channel/${item.slug}?source=mta`
    window.location = url;
  };

  render() {
    var sliderSettings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      responsive: [
          {
            breakpoint: 3000,
            settings: {
              slidesToShow: 8.5,
              slidesToScroll: 3,
              initialSlide: 0,
              arrow: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0,
              arrows: true
            }
          }
      ]
    };

    return (
      <div className="mta_app">
            <header className="mta_header">
              Goonj TV - Watch Live TV Anytime, Anywhere
            </header>
            <div className="mta_ads">Ad Space 1</div>
            <div className="mta_slider">
              <Slider {...sliderSettings}>
                {this.state.data.map((item) => (
                  <div key={item.id} className="mta_slider-item" onClick={() => this.handleItemClick(item)}>
                    <img
                      src={IMAGE_PATH + item.thumbnail.replace("webp", "jpg")}
                      alt={item.title}
                      className="mta_item-thumbnail"
                    />
                    <div className="mta_item-title">{item.name}</div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mta_ads">Ad Space 2</div>
          </div>
    );
  }
}

export default Home;
