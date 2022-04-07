import React from "react";
import "./Investors.css"

export const Investors=()=>{
    let investors: { name: string; comp: string; contact: string; }[] = []
    investors=[
        {
            name:'sam',
            comp:'google',
            contact:'sam@gmail.com'
        }
    ]
    for (let i of investors){
        <div className="card">{i.name}</div>
    }
    
    return(
        <div className="area">

            <div className="title">
                <div>
                Investors you should follow
                </div>
            </div>

            <div className="card_area">
                
                <div className="card">

                </div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
            </div>
        </div>
    )
}
