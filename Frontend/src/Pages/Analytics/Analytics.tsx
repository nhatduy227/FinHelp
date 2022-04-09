import React from "react";
import './Analytics.css'
import Card from '@mui/material/Card';
import SearchIcon from '@mui/icons-material/Search';
import { SafeAnchor } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';

import { Companies } from "../../Components/Header/HeaderData";
import { FinancialReport } from "./AnalyticsData";
import { Financial } from "../../Models/FinancialReport";
import { Typography } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgb(7,45,75, 0.05)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '50%',
  },
}));


const news = [
  {
    headline: 'this headline',
    image: 'https://www.marketplace.org/wp-content/uploads/2019/09/stockmarket.jpg?fit=2880%2C1621',
    summary: 'report summary',
    datetime: 20,
    source: 'source1',
    url: 'dummy url'
  }
]

function Analytics() {
  const [report, setReport] = useState('')
  const [companies, setCompanies] = useState<Array<{ name: string, logo: string }>>([])

  const [companyName, setCompanyName] = useState('');
  const [companyReport, setCompanyReport] = useState<Financial>();

  const handleSearchChange = (event: React.SyntheticEvent<Element, Event>, searchString: string) => {
    console.log(event);

    setCompanyName(searchString);
    if (event.type === 'click') {
      console.log("Move to new page");

      //To call fetch and assign to company report
      setCompanyReport(FinancialReport);
    }
  }

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

      {/* <Box sx={{ alignContent: 'center' }}> */}
      <Search sx={{ alignItems: 'center' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Companies}
          getOptionLabel={(option) => option.label}
          sx={{ mf: 5 }}
          renderInput={(params) => <TextField {...params} />}
          popupIcon={<SearchIcon />}
          forcePopupIcon={true}
          inputValue={companyName}
          onInputChange={(event, newInputValue) => {
            handleSearchChange(event, newInputValue);
          }}
        />
      </Search>
      {/* </Box> */}

      <Box className="report-box" sx={{
        p: 5,
        m: 5
      }}>
        {
          companyReport !== undefined
            ? (
              <div className="report-content">
                <Box>
                  <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold'}}>
                    {"Index Score: "}
                  </Typography>
                  <Typography display="inline" variant="h5">
                    {companyReport?.score}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold'}}>
                      {"Report summary: "}
                    </Typography>
                    <Typography display="inline" variant="h5">
                      {companyReport?.summary}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold'}}>
                    {"Investing Strategy: "}
                  </Typography>
                  <Typography display="inline" variant="h5">
                    {"Based on your portfolio, investing strategy and industry, we suggest you to invest $300 of AAPL"}
                  </Typography>
                </Box>
              </div>
            )
            : (
              <div>
              </div>
            )
        }
      </Box>
    </div>
  );
}
export default Analytics;
