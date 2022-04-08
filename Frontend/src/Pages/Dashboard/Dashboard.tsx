import './Dashboard.css';

import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';
import React, { useEffect, useState } from 'react';

import { Item } from '../../Components/ButtonSeries/Item';
import { News } from '../../Models/News';
import { getNews } from '../../Services/NewsService';
import theme from '../../theme/theme';
import { timeDifference } from '../../Util/convertDate';
import { followers, symbols } from './DashboardData';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: 16,
    marginBottom: theme.spacing(2)
  },
  media: {
    minWidth: '25%',
    maxWidth: '25%',
    // flexShrink: 0,
    backgroundImage: `url("https://www.globalpharmatek.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg")`,
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
  },
  rating: {
    verticalAlign: 'text-top',
  },
  content: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    // marginTop: 20,
    width: '80%'
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginBottom: 0,
    marginRight: theme.spacing(1),
    display: 'inline-block',
  },
  body: {
    fontSize: 14,
    color: "#072D4B",
  },
  source: {
    fontSize: 6,
    color: "#072D4B",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
  },
  icon: {
    fontSize: '1.2rem',
    verticalAlign: 'bottom',
  },
  headerSection: {
    marginTop: theme.spacing(5)
  },
  textHolder: {
    overflow: 'hidden',
    height: theme.spacing(8),
  },
  headline: {
    overflow: 'hidden',
    height: theme.spacing(8)
  },
  followButton: {
    width: theme.spacing(10)
  },
  cardFollow: {
    borderRadius: 12,
    // minWidth: 256,
    width: '100%',
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  headingFollow: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: 'red',
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: 'red',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
});

function NewsCard(props: News) {
  const classes = useStyles();

  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();

  let { headline, image, source, url, summary, datetime } = props

  const date = timeDifference(new Date(), new Date(datetime * 1000));


  return (
    <Card className={classes.card} elevation={0}>
      <CardContent
        className={classes.content}
        sx={{
          padding: theme.spacing(0, 2, 0, 1)
        }}
      >
        <Link href={url} style={{ textDecoration: 'none' }}>
          <Box mb={1} className={classes.headline}>
            <Typography variant="h6" className={classes.heading} style={{ color: 'black' }}>{headline}</Typography>
          </Box>
          <Box className={classes.textHolder}>
            <Typography variant="subtitle2" className={classes.body} sx={{ opacity: 0.72 }}>
              {summary}
            </Typography>
          </Box>
        </Link>
        <Divider className={classes.divider} light />
        <div className={flexStyles.parent}>
          <Box>
            <Typography variant="caption" className={classes.source} sx={{ opacity: 0.72 }}>
              {source + " - " + date}
            </Typography>
          </Box>
          <div
            className={cx(
              flexStyles.rightChild,
              flexStyles.parent,
              gutterStyles.parent
            )}
          >
            <Button type={'button'} className={labelStyles.link}>
              <ShareIcon className={labelStyles.icon} /> Share
            </Button>
            <Button type={'button'} className={labelStyles.link}>
              <LibraryAddIcon className={labelStyles.icon} /> Read later
            </Button>
          </div>
        </div>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={image}
      />
    </Card>
  );
};

function NewsSection() {
  const classes = useStyles();
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [news, setNews] = useState<Array<News>>([]);
  const [isLoading, setLoading] = useState(true);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setSelectedSymbol(event.currentTarget.value);
  }

  const getNewsBySymbol = (symbol: String) => {
    getNews(symbol)
      .then(response => {
        console.log(response);
        setNews(response.data);
        console.log(news);
        setLoading(false);
      })
  }

  useEffect(() => {
    getNewsBySymbol(selectedSymbol);
  }, [selectedSymbol])

  useEffect(() => {
    console.log(news);
  }, [news])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    // className={classes.headerSection}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Top picks for you
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 1,
          mb: 2
        }}
      >
        {
          Object.keys(symbols).map(function (item, index) {
            console.log(symbols[index])
            return (
              <Item
                value={symbols[index]}
                onClick={handleFilterClick}
                sx={{
                  width: '5%',
                  borderRadius: 20,
                }}
                style={{
                  backgroundColor: (symbols[index] === selectedSymbol ? theme.palette.primary.main : 'white'),
                  color: (symbols[index] === selectedSymbol ? "white" : "black"),
                }}
              >
                {symbols[index]}
              </Item>
            )
          })
        }
      </Box>

      {
        !isLoading
          ? (
            <>
              <NewsCard
                headline={news[0].headline}
                image={news[0].image}
                source={news[0].source}
                url={news[0].url}
                datetime={news[0].datetime}
                summary={news[0].summary}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <NewsCard
                    headline={news[1].headline}
                    image={news[1].image}
                    source={news[1].source}
                    url={news[1].url}
                    datetime={news[1].datetime}
                    summary={news[1].summary}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <NewsCard
                    headline={news[2].headline}
                    image={news[2].image}
                    source={news[2].source}
                    url={news[2].url}
                    datetime={news[2].datetime}
                    summary={news[2].summary}
                  />
                </Grid>
              </Grid></>
          )
          : (
            <p>Loading...</p>
          )
      }
    </Box>
  )
}

function InvestorSection() {
  const classes = useStyles();

  const [follow, setFollow] = useState<Array<number>>([]);
  const shadowStyles = useFadedShadowStyles();

  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  const handleFollowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFollow(existingItems => {
      return [
        ...existingItems,
        parseInt(event.currentTarget.value)
      ]
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
      className={classes.headerSection}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        <HistoryEduIcon />
        Investors you should follow
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {
          followers.map((item, index) => {
            return (
              <Grid item xs={6} md={4} lg={2}>
                <Card
                  className={cx(classes.cardFollow, shadowStyles.root)}
                  sx={{
                    p: 2,
                    mr: 5
                  }}
                >
                  <CardContent>
                    <Avatar className={classes.avatar} src={'https://i.pravatar.cc/300'} sx={{ width: 80, height: 80 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} >
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                      {item.handle}
                    </Typography>

                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: 'white', width: '100%' }}
                    value={index}
                    onClick={handleFollowClick}
                    disabled={follow.includes(index) ? true : false}
                  >
                    {follow.includes(index) ? "Followed" : "Follow"}
                  </Button>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  );
}

function Dashboard() {
  return (
    <div style={{ width: '100%' }}>
      <NewsSection />
      <InvestorSection />
    </div>
  );
}
export default Dashboard;
