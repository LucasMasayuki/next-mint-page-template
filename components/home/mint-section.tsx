import { Box, Grid, Typography } from '@mui/material';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Contracts from 'utils/Contracts.json';
import { CONTRACT_ADDRESS } from 'utils/constants';

import {
  AlertSeverity,
  openNotification,
} from 'presentation/stores/notification-slice';
import BaseFrame from '../base/base-frame';
import { useAppDispatch } from 'presentation/app/hooks';

import Styles from '../../styles/home.module.css';
import MintContainer from './mint-container';

const AbstractDogSection: NextPage = () => {
  const dispatch = useAppDispatch();
  const [qtyMinted, setQtyMinted] = useState(0);
  const [soldOut, setSoldOut] = useState(true);
  const [check, setCheck] = useState(0);

  useEffect(() => {
    const watchMintedFunction = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            Contracts.abi,
            signer
          );

          const totalMinted = await connectedContract.totalSupply();
          setQtyMinted(
            parseFloat(ethers.utils.formatEther(totalMinted)) *
              1000000000000000000
          );

          let maxSupply = await connectedContract.MAX_SUPPLY();

          if (totalMinted === maxSupply) {
            setSoldOut(true);
          }
        } else {
          console.log("Ethereum object doesn't exist");
          dispatch(
            openNotification({
              message: 'Plz install metamask',
              severity: AlertSeverity.ERROR,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const id = setInterval(async () => {
      await watchMintedFunction();
      setCheck(check + 1);
    }, 3000);

    return () => clearInterval(id);
  }, [check, dispatch]);


  return (
    <Grid
    container
    textAlign="center"
    alignItems="center"
    pr={{ xs: 2, md: 4 }}
    pl={{ xs: 2, md: 4 }}
    sx={{height: '100vh'}}
    >
    <Grid item xs={12} md={4}>
      <BaseFrame src="/ape1.webp"/>
    </Grid>
    <Grid item xs={12} md={8}>
        <Box
        sx={{
            borderColor: 'orange',
            borderStyle: 'solid',
            borderSize: 2,
            borderRadius: 10,
            color: 'black',
            height: '100%',
            p: 4,
            boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
        }}
        >
        <Typography
            variant="h3"
            fontWeight="bold"
            className={Styles['typography']}
        >
            Welcome
        </Typography>
        <br />
        <Typography
            variant="h4"
            fontWeight="bold"
            className={Styles['typography']}
        >
            <Typography
            variant="h4"
            component="span"
            className={Styles['typography']}
            >
            {qtyMinted} of 666 minted
            </Typography>
        </Typography>
        <br />
        <Typography
            variant="body2"
            fontWeight="bold"
            className={Styles['typography']}
        >
            Price:{'  '}
            <Typography
            variant="body2"
            component="span"
            className={Styles['typography']}
            >
            0.00666 eth each
            </Typography>
        </Typography>
        <Typography
            variant="body2"
            fontWeight="bold"
            className={Styles['typography']}
        >
            P/Wallet: 2
        </Typography>
        <br />
        {soldOut ? (
            <Typography
            variant="h1"
            fontWeight="bold"
            className={Styles['typography']}
            >
            SOLD OUT
            </Typography>
        ) : (
            <MintContainer />
        )}
        </Box>
    </Grid>
    </Grid>
  );
};

export default AbstractDogSection;
