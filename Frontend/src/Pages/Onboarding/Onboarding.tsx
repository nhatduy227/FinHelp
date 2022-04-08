import './Onboarding.css';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

import { auth, updateFirestoreUser } from '../../firebase-config';
import { GettingStarted } from '../../Models/GettingStarted';
import theme from '../../theme/theme';
import { depositData, formData } from './OnboardingData';

const useStyles = makeStyles({
  grid: {
    margin: theme.spacing(2),
  },
  formDropdown: {
    color: 'red'
  },
  noBorder: {
    border: 'none'
  },
  select: {
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  submitButton: {
    width: '20%',
    alignSelf: 'flex-end',
    marginRight: theme.spacing(2)
  },
  highlightText: {
    color: theme.palette.primary.main
  },
  caption: {
    textAlign: 'left'
  },
  divider: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  }
})

function Item(props: ButtonProps) {
  const { sx, ...other } = props;
  return (
    <Button
      variant="contained"
      sx={{
        m: 1,
        // backgroundColor: "transparent",
        borderRadius: 2,
        boxShadow: 'none',
        width: '25%',
        ...sx,
      }}
      {...other}
    />
  );
}

function GetStartedForm() {
  const classes = useStyles();

  const [investingStrategy, setInvestmentStrategy] = useState('Long-term Investor');
  const [industry, setIndustry] = useState('Technology');
  const [depositAmount, setDepositAmount] = useState(0);
  const [index, setIndex] = useState(-1);
  const [errorStatus, setError] = useState(false);
  const [count, setCount] = useState(true);

  const handleInvestmentStrategyChange = (event: SelectChangeEvent) => {
    setInvestmentStrategy(event.target.value as string);
  };

  const handleIndustryChange = (event: SelectChangeEvent) => {
    setIndustry(event.target.value as string);
  };

  const handleDepositClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIndex(parseInt(event.currentTarget.value));
  }

  const handleDepositAmount = (amount: string) => {
    if (amount !== '') {
      setCount(false);
      const depositTotal: number = parseInt(amount);

      if (depositTotal < 0) {
        setError(true);
      } else {
        if (index === 0 && depositTotal > 100) {
          setError(true)
        } else if (index === 1 && (depositTotal < 100 || depositTotal > 500)) {
          setError(true)
        } else if (index === 2 && (depositTotal < 500 || depositTotal > 1000)) {
          setError(true)
        } else if (index === 3 && depositTotal < 1000) {
          setError(true)
        } else {
          setError(false)
          setDepositAmount(depositTotal)
        }
      }
    } else {
      setCount(true)
    }
  }

  const updateData = async () => {
    const uuid = auth.currentUser?.uid

    const updatedData: GettingStarted = {
      industry: industry,
      investingStrategy: investingStrategy,
      deposit: depositAmount
    }

    await updateFirestoreUser(uuid, updatedData);
  }

  const completeOnboarding = async () => {
    await updateData()
    localStorage.setItem('firstTimeUser', "1");
    window.location.reload();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left'
      }}>

      {
        (formData.map((item, index) => {
          return (
            <Box
              sx={{
                p: 1,
                m: 1
              }}
            >
              <Typography variant='h6'>
                {item.question}
              </Typography>
              <FormControl fullWidth>
                <Select
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: 20,
                      backgroundColor: 'white',
                      zIndex: -1,
                    },
                  }}
                  style={{ color: theme.palette.primary.main }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                  }}
                  className={classes.select}
                  value={index === 0 ? industry : investingStrategy}
                  onChange={index === 0 ? handleIndustryChange : handleInvestmentStrategyChange}
                >
                  {
                    (item.options.map((option, optionIndex) => {
                      return (
                        <MenuItem value={option}>{option}</MenuItem>
                      )
                    }))
                  }
                </Select>
              </FormControl>
            </Box>
          )
        }))
      }

      <Box
        sx={{
          p: 1,
          m: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h6'>
          How much money do you want to deposit?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 1,
          }}
        >

          {
            Object.keys(depositData).map(function (item, indexSelection) {
              return (
                <Item
                  value={indexSelection}
                  onClick={handleDepositClick}
                  style={{
                    backgroundColor: (indexSelection === index ? theme.palette.primary.main : 'transparent'),
                    color: (indexSelection === index ? "white" : theme.palette.primary.main),
                  }}
                >
                  {depositData[indexSelection]}
                </Item>
              )
            })
          }
        </Box>
        {
          index >= 0
            ?
            <TextField
              error={errorStatus}
              helperText={errorStatus ? "Please enter the valid amount" : ""}
              id="standard-basic"
              label="Amount"
              variant="standard"
              onChange={(v) => handleDepositAmount(v.target.value)}
              defaultValue={0}
            />
            : undefined
        }

      </Box>
      <Button
        variant="contained"
        disabled={(errorStatus || (index === - 1) || count) ? true : false}
        onClick={completeOnboarding}
        className={classes.submitButton}
        style={{
          borderRadius: 20,
          color: "white"
        }}
        sx={{
          m: 2,
          p: 1
        }}
      >
        Done
      </Button>
    </Box >
  )
}

function WelcomeLine() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        p: 1,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      className={classes.caption}
    >
      <Box>
        <Typography display="inline" variant="h1">Tell </Typography>
        <Typography display="inline" variant="h1" className={classes.highlightText}>us</Typography>
      </Box>
      <Box>
        <Typography display="inline" variant="h1">a little </Typography>
        <Typography display="inline" variant="h1" className={classes.highlightText}>more</Typography>
      </Box>
      <Box>
        <Typography display="inline" variant="h1">about </Typography>
        <Typography display="inline" variant="h1" className={classes.highlightText}>you</Typography>
      </Box>
    </Box>
  )
}

function Onboarding() {
  const classes = useStyles();

  return (
    <Box className='container' style={{ display: "flex" }}>
      <Grid
        container
        className={classes.grid}
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={6}>
          <WelcomeLine />
        </Grid>
        <Hidden mdDown>
          <Divider orientation="vertical" color="primary" sx={{ borderRightWidth: 'thick' }} className={classes.divider} />
        </Hidden>
        <Grid item xs={12} md={5} lg={5}>
          <GetStartedForm />
        </Grid>
      </Grid>
    </Box >

  );
}

export default Onboarding;
