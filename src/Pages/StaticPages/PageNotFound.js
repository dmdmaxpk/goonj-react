import React from 'react';
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"

export default function PageNotFound(){
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12} style={{textAlign: "center"}}>
                <img className="notFoundImg" src={require('../../Assets/page-not-found.png')} alt="Not Found" />
            </GridItem>
        </GridContainer>
    )
}