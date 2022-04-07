import React, { useEffect, useState } from "react";
import "./Articles.css"
// import {NewsData} from "./NewsData"

// interface filtArticle{
//     title:string,
//     body:string,
//     comp:string
// }

// const Articles=({title,body,comp}:filtArticle)=>{

const Articles=()=>{
    
    return(
        <div className="area" >
            <div className="row1">
                
                <div className="row_area">
                    <div className="row">
                        <div className="content">
                            <div className="row1_col1">
                                <div className="title">
                                    Samsung Galaxy F22 launched in India: Price, features, other details
                                </div>
                                <div className="desc">
                                    <p>Samsung Galaxy F22 has been launched in India. The new smartphone has been priced in the mid-range segment. The new smartphone is powered by a MediaTek chipset and features a high refresh rate AMOLED display. </p>
                                </div>
                            </div>
                            <div className="row1_col2">
                                {/* <img src="https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg" alt=""> */}
                            </div>
                        </div>
                            <div className="footer">
                            </div>
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="row_area col1">
                    <div className="row">
                        <div className="content">
                            <div className="col1">

                                <div className="title">
                                Samsung Galaxy F22 launched in India: Price, features, other details
                                </div>
                                
                                <div className="desc">
                                    <p>Samsung Galaxy F22 has been launched in India. The new smartphone has been priced in the mid-range segment. The new smartphone is powered by a MediaTek chipset and features a high refresh rate AMOLED display.</p>
                                </div>
                            </div>
                            <div className="col2">
                                {/* <img src="https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg" alt=""> */}
                            </div>
                        </div>
                            <div className="footer">
                            </div>
                    </div>
                </div>
    
                <div className="row_area col2">
                    <div className="row">
                        <div className="content">
                            <div className="col1">
                                <div className="title">
                                    Samsung Galaxy F22 launched in India: Price, features, other details
                                </div>
                                <p>

                                </p>
                                {/* <p>Samsung Galaxy F22 has been launched in India. The new smartphone has been priced in the mid-range segment. The new smartphone is powered by a MediaTek chipset and features a high refresh rate AMOLED display. </p> */}
                            </div>
                            <div className="col2">
                                {/* <img src="https://caltech-prod.s3.amazonaws.com/main/images/CollinCamerer-ShortSelling-0.2e16d0ba.fill-1600x810-c100.jpg" alt=""> */}
                            </div>
                        </div>
                            <div className="footer">
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Articles