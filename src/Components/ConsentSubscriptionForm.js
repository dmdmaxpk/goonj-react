import * as React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import "./ConsentStyling.css";
import {useState} from "react";
import telenor from "./telenor.jpg";
import axios from "axios"; // Import Axios




// const style={
//     position:"absolute",
//     top:"50%",
//     left:"50%",
//     transform:"translate ("-50%", "-50%")",
//     width:400,
//     bgcolor: 'background.paper',
//     border:"2px solid #000",
//     boxShadow:24,
//     p:4,
//     variant:"outlined",

// }; 
const ConsentButton = (props) => {
const [consent, setConsent] = useState(null);
    console.log(props);
    const [token,setToken]=useState(null);

    const handleButtonClick = async (value) => {
      setConsent(value);
      // Add your JavaScript functionality here based on the user's choice
      if (value === 'yes') {
        try {
          // Generate token using Tokenization API
          const tokenResponse = await axios.post("https://apis.telenor.com.pk/oauthtoken/v1/generate");
          const generatedToken = tokenResponse.data.token;
  
          // Use the generated token for subsequent requests
          setToken(generatedToken);
  
          // Generate consent tokens using the generated token
          const consentResponse = await axios.post(
            "https://apis.telenor.com.pk/cms/v1/token",
            { token: generatedToken }
          );
          console.log("Consent tokens generated:", consentResponse.data);
        }
        // Handle 'Yes' consent
        catch (error) {
          console.error("Error:", error);
        }
      }
        else if (value === 'no') {
        // Handle 'No' consent
        console.log('User consented: No');
      }
    };
    
    React.useEffect(()=> {
        console.log('props', props);
        // props.onOpen()
    }, [props])
    const submitConsent = async () => {
      try {
        // Submit consent using the generated token
        const submitResponse = await axios.post(
          "https://apis.telenor.com.pk/cms/v1/consent",
          { token: token }
        );
        console.log("Consent submitted:", submitResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
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
            <button className="confirm-button" onClick={() => props.onConfirm()}>Confirm</button>
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