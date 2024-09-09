import React from "react";
import SideWhole from "../SideWhole";
import BarcodeValidator from "./BarcodeValidator";

function Recieve(){
    return(
        <>
        <SideWhole/>
        <div className="dash-board">
        <h1>Recieve Shipment</h1>
        <BarcodeValidator/>
        
        </div>
        </>
    )
}
export default Recieve;