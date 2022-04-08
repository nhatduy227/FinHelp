import React from "react";
import "./Investors.css"
import Card from '../UI/Card'

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

        <div >
            <div className="title">
                <div>
                Investors you should follow
                </div>
            </div>

            <div className="investor-area">

                
                <Card className="investor-item">
                    <div>investor </div>
                </Card>

                <Card className="investor-item">
                    <div>Investor</div>
                </Card>

                <Card className="investor-item">
                    <div>Investor</div>
                </Card>

                <Card className="investor-item">
                    <div>Investor</div>
                </Card>

                <Card className="investor-item">
                    <div>Investor</div>
                </Card>

            </div>

        </div>
    )
}
