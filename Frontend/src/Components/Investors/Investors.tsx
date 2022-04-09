import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';
import React, { useState } from 'react';

import { followers } from '../../Pages/Dashboard/DashboardData';
import theme from '../../theme/theme';

const useStyles = makeStyles({
    headerSection: {
        marginTop: theme.spacing(5)
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
})

function Investors() {
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
    )
}

export default Investors;