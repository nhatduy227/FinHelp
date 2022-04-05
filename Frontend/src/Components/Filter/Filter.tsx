import React from "react";
import "./Filter.css"

function Filter(){
    return(
        <div className="area">
            <div className="title">
                <div>
                    Top picks for you
                </div>
            </div>

            <div className="options">
                <div>Amazon</div>
                <div>Netflix</div>
                <div>Google</div>
                <div>Tesla</div>
                <div>Meta</div>
            </div>
        </div>
    )
}

export default Filter