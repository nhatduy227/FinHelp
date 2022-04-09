import './Analytics.css';

import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { useEffect, useState } from 'react';

import { Companies } from '../../Components/Header/HeaderData';
import { auth, getFirestoreUser } from '../../firebase-config';
import { Financial } from '../../Models/FinancialReport';
import { User } from '../../Models/User';
import theme from '../../theme/theme';
import { FinancialReport } from './AnalyticsData';
import * as data from './test.json';

const useStyles = makeStyles({
  highlighter: {
    color: theme.palette.primary.main
  },
  negativeHighlighter: {
    color: theme.palette.error.main
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgb(7,45,75, 0.05)",
  marginRight: theme.spacing(2),
  // marginLeft: 0,
  alignSelf: 'center',
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

  const uid = auth.currentUser?.uid
  const [userData, setUserData] = useState<User | DocumentData>();
  const [investmentAmount, setInvestmentAmount] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    getFirestoreUser(uid).then(function (data) {
      setUserData(data);

      return data
    })
  }, [uid])

  const handleSearchChange = async (event: React.SyntheticEvent<Element, Event>, searchString: string) => {
    console.log(event);

    setCompanyName(searchString);
    if (event.type === 'click') {
      const response = await fetch(
        `http://127.0.0.1:5000/financial-report/summary?symbol=${companyName}&length=0.01`,
        { mode: 'cors' }
      );

      let res = await response.json();
      let data = res.data;
      console.log(data)
      //To call fetch and assign to company report
      setCompanyReport({
        score: FinancialReport.data.score,
        summary: FinancialReport.data.summary
      });

      setInvestmentAmount(((FinancialReport.data.score) / 10) * userData?.deposit)
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
          renderInput={(params) => <TextField placeholder={"Search for stocks..."} {...params} />}
          popupIcon={<SearchIcon />}
          forcePopupIcon={true}
          inputValue={companyName}
          onInputChange={async (event, newInputValue) => {
            await handleSearchChange(event, newInputValue);
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
                  <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold' }}>
                    {"Index Score: "}
                  </Typography>
                  <Typography display="inline" variant="h5">
                    {companyReport?.score}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold' }}>
                    {"Investing Strategy: "}
                  </Typography>

                  <Typography display="inline" variant="h5">
                    Based on your portfolio, investing strategy and industry, we suggest you to
                  </Typography>

                  {
                    FinancialReport.data.score > 0
                      ? (
                        <Typography display="inline" variant="h5" className={classes.highlighter}>
                          {" invest $ " + investmentAmount.toFixed(2)}
                        </Typography>
                      )
                      : (
                        <Typography display="inline" variant="h5" className={classes.negativeHighlighter}>
                          {" not invest in " + companyName}
                        </Typography>
                      )
                  }

                  <Typography display="inline" variant="h5">
                    {
                      FinancialReport.data.score > 0
                        ? ` into `
                        : " at the moment"
                    }
                  </Typography>

                  {
                    FinancialReport.data.score > 0
                      ? (
                        <Typography display="inline" variant="h5" className={classes.highlighter}>
                          {companyName}
                        </Typography>
                      )
                      : (
                        <Typography display="inline" variant="h5" className={classes.negativeHighlighter}>

                        </Typography>
                      )
                  }

                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography display="inline" variant="h5" sx={{ fontWeight: 'bold' }}>
                    {"Report summary: "}
                  </Typography>
                  <Typography display="inline" variant="h5">
                    {companyReport?.summary}
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
