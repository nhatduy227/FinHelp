import React, { FC } from "react";
import "./Filter.css"

const Filter=()=>{
    function onClick(){
        alert('a')
    }
    return(
        <div className="area">
            <div className="title">
                <div>
                    Top picks for you
                </div>
            </div>

            <div className="options">
                <div onClick={onClick}>Amazon</div>
                <div>Netflix</div>
                <div>Google</div>
                <div>Tesla</div>
                <div>Meta</div>
            </div>
        </div>
    )
}

export default Filter