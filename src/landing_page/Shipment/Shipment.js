import React from "react";
import SideManu from "../SideManu";
import AddPro from "./Blockchain_addProduct";
function Shipment(){
    return(
        <>
        <SideManu/>
        <div className="dash-board">
        <h1>Shipment</h1>
        <AddPro/>
        </div>
        </>
    )
}
export default Shipment;