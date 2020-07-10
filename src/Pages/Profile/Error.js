import React from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import {Link} from 'react-router-dom';
// import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function ErrorComponent(props){
    let paywall = props.paywall ? props.paywall : "live";
    return(
        <GridContainer className="userInfoContainer">
            <GridItem xs={12} sm={12} md={12} className="errorGridItem">
                <VisibilityOffIcon className="errorIcon" style={{fontSize: 100}} />
                <p className="loginErrorText">Please <Link to={`/paywall/${paywall}?access=login`}>login</Link> to continue.</p>
            </GridItem>
        </GridContainer>
    )
}