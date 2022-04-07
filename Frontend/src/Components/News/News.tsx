import React, { useEffect, useState } from "react";
// import './News.css'
// import {NewsData} from "./NewsData"
import Filter from "../Filter/Filter";
import Articles from "../Articles/Articles";

const News=()=>{
    const NewsData=[
        {
            title:'title 1',
            body:"this is body 1",
            comp:"Apple"
        },
        {
            title:'title 2',
            body:"this is body 2",
            comp:"Amazon"
        },
        {
            title:'title 3',
            body:"this is body 3",
            comp:"Google"
        }
    ]

    const [filtComp,setfiltComp]=useState('')

    const filterHandler = (selectedComp: string) => {
        setfiltComp(selectedComp);
    }
    
    let filtArticles: { title: string; body: string; comp: string; }[] = []

    useEffect(() => {
        filtArticles = NewsData.filter((item) => {

            return item.comp == 'Apple'
            // return item.comp == filtComp

        })
        console.log(filtArticles[0].title)
    }, [])
    


    return(
        <div >
        {/* pass filterHandler to Filter component, 
            pass filtArticles to Articles component */}
            
            <Filter /> 
            <Articles /> 

        
        </div>
    )
}

export default News;