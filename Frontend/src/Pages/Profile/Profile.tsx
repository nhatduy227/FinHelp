import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { auth, getFirestoreUser, updateFirestoreUser } from '../../firebase-config';
import { ProfileData } from '../../Models/Profile';
import { User } from '../../Models/User';
import theme from '../../theme/theme';
import { profileData } from './ProfileData';

const useStyles = makeStyles({
    profile: {
        alignSelf: 'center'
    },
    textFields: {
        width: '100%',
    }
})

function Profile() {
    const classes = useStyles();

    const [username, setUsername] = useState('')
    const [investingStrategy, setInvestmentStrategy] = useState('Long-term Investor');
    const [industry, setIndustry] = useState('Technology');
    const [deposit, setDeposit] = useState(0);
    const [error, setError] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);

    const uid = auth.currentUser?.uid
    const [userData, setUserData] = useState<User | DocumentData>();

    useEffect(() => {
        getFirestoreUser(uid).then(function (data) {
            setUserData(data);

            setUsername(data?.userName);
            setIndustry(data?.industry);
            setInvestmentStrategy(data?.investingStrategy);
            setDeposit(data?.deposit);

            return data
        })
    }, [uid, updateCount])

    useEffect(() => {
        console.log(userData)
    }, [userData])

    useEffect(() => {
        console.log(deposit)
    }, [deposit])

    const handleInvestmentStrategyChange = (event: SelectChangeEvent) => {
        setInvestmentStrategy(event.target.value as string);
    };

    const handleIndustryChange = (event: SelectChangeEvent) => {
        setIndustry(event.target.value as string);
    };

    const handleDepositAmount = (amount: string) => {
        if (amount !== '') {
            try {
                const depositTotal: number = parseInt(amount);

                setError(false)
                setDeposit(depositTotal);
            } catch (error) {
                setError(true)
            }
        }
    }

    const handleUsername = (username: string) => {
        setUsername(username)
    }

    const updateData = async () => {
        const uid = auth.currentUser?.uid

        const updatedData: ProfileData = {
            userName: username,
            industry: industry,
            investingStrategy: investingStrategy,
            deposit: deposit
        }

        await updateFirestoreUser(uid, updatedData);
        setUpdateCount(updateCount + 1);
    }

    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    mr: 10,
                    ml: 10,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 2,
                        p: 2,
                    }}
                    className={classes.profile}
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={userData?.profilePic}
                        sx={{
                            width: 150,
                            height: 150
                        }}
                    />
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: 'bold',
                            mt: 2,
                            textAlign: 'center'
                        }}
                    >
                        {userData?.userName}
                    </Typography>
                </Box>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Basic information
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant='contained'
                                style={{
                                    color: "white"
                                }}
                                size="large"
                                sx={{
                                    ml: 2,
                                }}
                                onClick={updateData}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Divider
                    color="primary"
                    sx={{
                        borderRightWidth: 'thick',
                        width: '100%',
                        mt: 2,
                        mb: 2
                    }}
                />
                <Box className={classes.textFields}>
                    <Typography variant='body1' margin="normal">
                        Username
                    </Typography>
                    <TextField
                        color="primary"
                        fullWidth
                        value={username || ''}
                        onChange={(v) => handleUsername(v.target.value)}
                    />
                </Box>

                {
                    (profileData.map((item, index) => {

                        return (
                            <Box
                                className={classes.textFields}
                                sx={{
                                    mt: 2
                                }}
                            >
                                <Typography variant='body1' margin="normal">
                                    {item.question}
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
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
                                        //   className={classes.select}
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
                    className={classes.textFields}
                    sx={{
                        mt: 2
                    }}>
                    <Typography variant='body1'>
                        Deposit
                    </Typography>
                    <TextField
                        error={error}
                        helperText={error ? "Please enter the valid amount" : ""}
                        id="standard-basic"
                        onChange={(v) => handleDepositAmount(v.target.value)}
                        value={deposit || 0}
                        fullWidth
                    />
                </Box>
            </Box>
        </div >
    )
}

export default Profile;