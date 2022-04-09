import './Dashboard.css';

import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShareIcon from '@mui/icons-material/Share';
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
import Investors from '../../Components/Investors/Investors';
import { News } from '../../Models/News';
import { getNews } from '../../Services/NewsService';
import theme from '../../theme/theme';
import { timeDifference } from '../../Util/convertDate';
import { symbols } from './DashboardData';

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

export const NewsCard=(props: News)=> {
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
  const [selectedSymbol, setSelectedSymbol] = useState('All');
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

function Dashboard() {
  return (
    <div style={{ width: '100%' }}>
      <NewsSection />
      <Investors />
    </div>
  );
}
export default Dashboard;
