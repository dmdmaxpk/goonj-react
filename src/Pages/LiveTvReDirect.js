import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import "./LiveTvRedirect.css"

const LiveTvReDirect = () => {
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search)
    const link = queryParams.get("link");
    return (
        <div className="iframe-container">
            <iframe
                src={link}
                frameBorder="0"
                title="Channel Content"
                className="full-page-iframe"
            />
        </div>
   
  )
}

export default LiveTvReDirect;