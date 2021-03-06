import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/styles';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { auth, getFirestoreUser } from '../../firebase-config';
import { Asset } from '../../Models/Asset';
import { OrderHistory } from '../../Models/OrderHistory';
import { User } from '../../Models/User';
import theme from '../../theme/theme';
import { numberWithCommas } from '../../Util/formatNumber';
import { TickerColor } from './PortfolioData';

const useStyles = makeStyles({
  upward: {
    color: theme.palette.primary.main,
  },
  downward: {
    color: theme.palette.error.main,
  },
  asset: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sticker: {
    width: '80%',
    paddingLeft: theme.spacing(2),
    color: 'white',
  },
  stockLogo: {
    color: 'white',
  },
  amount: {
    color: 'white',
    whiteSpace: 'nowrap'
  },
  stockCard: {
    width: '100%',
  },
  headerSection: {
    marginTop: theme.spacing(5)
  },
  profile: {
    alignSelf: 'center'
  },
  profileName: {
    textAlign: 'center',
    alignSelf: 'center'
  },
})

function splitArr(stockData: Array<Asset>) {
  const result: Array<Array<Asset>> = []
  let temp: Array<Asset> = []

  for (let i = 0; i < stockData.length; i++) {
    temp.push(stockData[i])

    if (temp.length === 4) {
      result.push(temp)

      temp = []
    }
  }

  if (temp.length !== 0) {
    result.push(temp)
  }

  return result
}

function AssetOwn(props: Asset) {
  const classes = useStyles();

  let { ticker, amount } = props
  const { color, logo } = TickerColor[ticker]

  return (
    <Card
      sx={{
        borderRadius: 20,
      }}
      style={{
        background: color
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          p: 1,
          m: 1,
        }}
      >
        {logo}
        <div className={classes.sticker}>
          <Typography variant="subtitle1">
            {ticker}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className={classes.amount}>
            {"$ " + numberWithCommas(amount)}
          </Typography>
        </div>
      </Box>
    </Card>
  )
}

function StockCards(props: any) {
  const classes = useStyles()
  const { stocksInfo } = props

  const result: Array<Array<Asset>> = splitArr(stocksInfo);

  return (
    <Box className={classes.headerSection} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        My Portfolio
      </Typography>
      <Grid container spacing={2}>
        {result.map((items: Array<Asset>, index) => {
          return (
            <Grid container item spacing={3}>
              {items.map((subItems: Asset, sIndex) => {
                console.log(subItems)
                return (
                  <Grid item xs={12} md={6} lg={3}>
                    <AssetOwn
                      ticker={subItems.ticker}
                      amount={subItems.amount}
                    />
                  </Grid>
                )
              })}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}

function TotalAsset(props: any) {
  const { stocksInfo } = props
  const { deposit } = props

  let asset = 0;
  const previousAsset = 1000;

  const classes = useStyles()

  for (let i = 0; i < stocksInfo.length; i++) {
    asset += parseInt(stocksInfo[i].amount)
  }

  const percentageChange = parseFloat((((asset - previousAsset) / (asset)) * 100).toFixed(2))

  return (
    <Card
      sx={{
        boxShadow: 0,
        backgroundColor: "transparent",
      }}
      className={classes.stockCard}
    >
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        Your total asset portfolio
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h4" className={classes.asset}>{"$ " + numberWithCommas(asset)}</Typography>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left',
          flexWrap: 'wrap',
        }}>
          {percentageChange >= 0 ? <ArrowUpwardIcon className={classes.upward} /> : <ArrowDownwardIcon className={classes.downward} />}
          <Typography variant='subtitle2' className={percentageChange >= 0 ? classes.upward : classes.downward} >
            {(percentageChange >= 0 ? "+" : "") + percentageChange + "%"}
          </Typography>
        </div>
      </Box>
    </Card>
  )
}

function History(props: any) {
  const { stocksInfo } = props
  const history: Array<OrderHistory> = stocksInfo

  const today= new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const todayString = mm + '/' + dd + '/' + yyyy;

  return (
    <List
      style={{
        width: '100%',
        marginTop: theme.spacing(5)
      }}
    >
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        History
      </Typography>
      {
        history.map((item: OrderHistory, index) => {
          return (
            <ListItem divider={index === history.length - 1 ? false : true}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
                style={{ width: '100%' }}
              >
                <Grid container>
                  <Grid item xs={11}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}>
                      <Typography variant="body1">
                        {"USD " + numberWithCommas(item.amount)}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        {"Buy " + item.ticker + " Stock"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'left',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
                      {todayString}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
          )
        })
      }
    </List >
  )
}

function Portfolio() {
  const uid = auth.currentUser?.uid
  const classes = useStyles();
  const [userData, setUserData] = useState<User | DocumentData>();
  const [userStock, setUserStock] = useState<Array<Asset>>([]);

  useEffect(() => {
    getFirestoreUser(uid).then(function (data) {
      setUserData(data);
      setUserStock(data?.stock)

      return data
    })
  }, [uid])

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={userData?.profilePic}
          sx={{
            width: 100,
            height: 100
          }}
          className={classes.profile}
        />
        <Box className={classes.profileName}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            {userData?.userName}
          </Typography>
          <Typography variant='h6'>
            {userData?.investingStrategy}
          </Typography>
        </Box>
        {/* <Button variant="contained" color="primary" className={classes.profile} style={{ color: 'white' }}>
          Get Profile
        </Button> */}
        <TotalAsset stocksInfo={userStock} />
        <StockCards stocksInfo={userStock} />
        <History stocksInfo={userStock} />
      </Box>
    </div>
  );
}

export default Portfolio;