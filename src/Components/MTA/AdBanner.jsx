import React, {useState} from "react";
import { event } from "react-ga";
import { trackEvent } from "../../Utils/functions";


const AdvertComponent = ({imageUrl, redirectUrl, className, eventTag}) => {
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleClick=(event)=>{
    console.log("Clicked", event.target);
    trackEvent('Custom Event', `${eventTag}_CLICK`, window.location.href);
    window.location.href = redirectUrl;
  }

  // Increment impressions count on component mount
  useState(() => {
    setImpressions(impressions + 1);
    trackEvent('Custom Event', `${eventTag}_VIEW`, window.location.href);
  }, []);

  return (
    <div className={`advert-mobile ${className ?? ''}`}>
      <img
        src={imageUrl}
        alt="Advertisement"
        style={{ cursor: 'pointer' }}
        className="advert"
        onClick={(event) => handleClick(event)}
      />
    </div>
  );
};

export default AdvertComponent;
