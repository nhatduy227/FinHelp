import React, { FC } from "react";
import "./Filter.css"

const Filter=()=>{
    function onClick(){
        alert('a')
    }
    return(
        <div>

            <div className="title">
                <div>
                    Top picks for you
                </div>
            </div>

            <div className="filter-item-area">

                <div onClick={onClick} className='filter-item'>Amazon</div>
                <div className='filter-item'>Netflix</div>
                <div className='filter-item'>Google</div>
                <div className='filter-item'>Tesla</div>
                <div className='filter-item'>Meta</div>

            </div>
        </div>
    )
}

export default Filter