import * as React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import "./ConsentStyling.css";
import {useState, useEffect} from "react";
import telenor from "./telenor.jpg";
import axios from "axios"; // Import Axios
import PaywallInstance from "../Utils/PaywallInstance";
 
const ConsentButton = (props) => {
  const { msisdn } = props;
  const [consent, setConsent] = useState(null);
  const [token, setToken] = useState(null);
  const [cmsTokenDetails, setCmsTokenDetails] = useState({});
  console.log(msisdn, 'msisdn')

  const submitConsent = async() => {
    try {
      // Submit consent using the generated token
      const submitResponse = await axios.post("https://apis.telenor.com.pk/cms/v1/consent", 
      { cid: cmsTokenDetails?.response?.correlationId, action: 'submit', token: cmsTokenDetails?.response.token })
      .then(res => {
        const result = res.data;
      })
      console.log("Consent submitted:", submitResponse.data);
      window.location.href = `https://apis.telenor.com.pk/cms/v1/redirect?token=${cmsTokenDetails?.response.token}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const preFetchToken = async (value) => {
    PaywallInstance.post('/payment/cms-token', {serviceId: '99146', msisdn: msisdn})
        .then(res => {
          const result = res.data;
          console.log('CMS token generated: ', result);
          let token = result.response.token;
          console.log('token', token);
          setCmsTokenDetails(result);
          // window.location.href = `https://apis.telenor.com.pk/cms/v1/redirect?token=${token}`;
        }).catch(err => {
            console.error('error', err);
        })
  };

  useEffect(()=>{
    if (props?.open && props.msisdn) preFetchToken();
    console.log("props", props);
  }, [props.open]);

    //       // Use the generated token for subsequent requests
    //       setToken(generatedToken);
    //       props.setToken(generatedToken);
    //       // Generate consent tokens using the generated token
    //       const consentResponse = await axios.post(
    //         "https://apis.telenor.com.pk/cms/v1/token",
    //         { serviceId: '99146', msisdn: '03468586076', channel: 'API' },
    //         {headers: {
    //           'Authorization': `Bearer ${generatedToken}`
    //         }}
    //       ).then(res => {
    //         submitConsent();
    //       })
    //       .catch(error => {
    //         console.log('error', error);
    //       })
    //       console.log("Consent tokens generated:", consentResponse.data);
    //     if (typeof props.onConfirm==="function")
    //       {props.onConfirm();}
    //       else if (value === 'no') {
    //         console.log('User consented: No');
    //     }
    //   }
    //     // Handle 'Yes' consent
    //     catch (error) {
    //       console.error("Error:", error);
    //     }
    //   }
    //     else if (value === 'no') {
    //     // Handle 'No' consent
    //     console.log('User consented: No');
    //   }
    // };
    
    // const submitConsent = async () => {
    //   try {
    //     // Submit consent using the generated token
    //     const submitResponse = await axios.post(
    //       "https://apis.telenor.com.pk/cms/v1/consent",
    //       { cid: token }
    //     );
    //     console.log("Consent submitted:", submitResponse.data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    
    // React.useEffect(()=> {
    //     console.log('props', props);
    //     // props.onOpen()
    // }, [props])
    return(
        <div>
            {/* <Button className="subscription-button" onClick={props.onOpen}>Subscription</Button> */}
            <Modal open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // style={style}
            >
            <Box className="consent-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <div style={{textAlign:"center"}}>
                <img src={telenor} style={{marginBottom:"80px", width: "50px", height: "50px", marginTop:"70px"}}  alt="Image" />
                </div>
                <p><h1>Rs.5 incl. Tax every day</h1>
                <p>Lorem ipsum is placeholder text commonly used in the graphic, print,</p>
                </p></Typography>
            <Typography id="modal-modal-description" sx={{mt:2}}>
            <button className="confirm-button"  onClick={submitConsent}>Confirm</button>
            <Typography variant="button" color="secondary" component="span" onClick={props.onClose} style={{ cursor: 'pointer',color:"white" }}>
          Cancel
        </Typography>
            <h2>
            
            Inclusive of all taxes.
            </h2>
            </Typography>
            </Box>
            </Modal>
            


        </div>
    )
}
export default ConsentButton;