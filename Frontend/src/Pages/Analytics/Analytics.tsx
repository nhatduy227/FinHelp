import React from "react";
import './Analytics.css'
import { NewsCard } from "../Dashboard/Dashboard";
import Card from '@mui/material/Card';
import { SafeAnchor } from "react-bootstrap";
import { useState,useEffect } from "react";
 
// const companies=[
//   {name:'Tesla',
//    logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
//   },
//   {name:'Apple',
//    logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
//   },
//   {name:'Google',
//    logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
//   },
//   {name:'Netflix',
//    logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
//   },
//   {name:'Facebook',
//    logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
//   },
// ]


const news=[
  {
    headline:'this headline',
    image:'https://www.marketplace.org/wp-content/uploads/2019/09/stockmarket.jpg?fit=2880%2C1621',
    summary:'report summary',
    datetime: 20,
    source: 'source1',
    url: 'dummy url'
  }
]

function Analytics() {
  const [report,useReport]=useState('')
  const [companies,useCompanies]=useState<Array<{name:string,logo:string}>>([])

  useEffect(()=>{
    useReport('Apple has made $1.6B in their profit this quarter ')
    useCompanies([
      {name:'Tesla',
       logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
      },
      {name:'Apple',
       logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
      },
      {name:'Google',
       logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
      },
      {name:'Netflix',
       logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
      },
      {name:'Facebook',
       logo:'https://cdn.mos.cms.futurecdn.net/irRfUAsTUeNEM676Bd6Wyb.jpg'
      },
    ])
  })

  return (
    <div className="container" style={{ width: '100%' }}>

      <div className="header-area">
        <div className="title">
          Financial Report Analyzer
        </div>
        <p>
            Enter a Stock Ticker to get a Detail Analysis of the most recent financial repots
        </p>
      </div>

      <div className="searchBar">

      </div>

      <div className="report-box">
        <div className="report-content">
          <h3>{report}</h3>
         
        </div>
      </div>

      <div className='related-report'>

        <div className="title">
          Related Financial Reports
        </div>
        {companies.map((item)=>{
          return (
            <Card  sx={{p: 2,mr: 5 }} className='related-report-card'>
            <img src={item.logo} />
            <div className="card-title">{item.name}</div>
            <div className="date">2022</div>
            <div className="viewMore">View More</div>
            </Card>
          )
        })}
        
      </div>

    </div>
  );
}
export default Analytics;
