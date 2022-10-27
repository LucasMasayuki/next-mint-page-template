import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from 'presentation/app/hooks';
import { selectAuth } from 'presentation/stores/auth-slice';
import { selectMint, setIsMinting } from 'presentation/stores/mint-slice';
import {
  AlertSeverity,
  openNotification,
} from 'presentation/stores/notification-slice';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Contracts from 'utils/Contracts.json';
import { CONTRACT_ADDRESS } from 'utils/constants';

const MintSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector(selectAuth);
  const { isMinting } = useAppSelector(selectMint);
  const [qty, setQty] = useState(1);

  const onClickIncrease = () => {
    const increment = qty + 1;
    if (increment > 2) {
      return;
    }

    setQty(increment);
  };

  const onClickDecrement = () => {
    const decrement = qty - 1;
    if (decrement < 1) {
      return;
    }

    setQty(decrement);
  };

  const onClickMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        dispatch(setIsMinting(true));
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Contracts.abi,
          signer
        );

        const price = await connectedContract.PRICE();
        const maxPerWallet = await connectedContract.MAX_PER_WALLET();
        const qtyMinted = await connectedContract.qtyMinted(account);
        const freeMints = await connectedContract.MAX_FREE_SUPPLY();
        const totalMinted = await connectedContract.totalSupply();
        const qtyFreeMinted = await connectedContract.qtyFreeMinted(account);
        let parsedMaxPerWallet = parseInt(maxPerWallet._hex, 16);
        let parsedQtyMinted = parseInt(qtyMinted._hex, 16);

        if (parsedMaxPerWallet < qty + parsedQtyMinted) {
          dispatch(
            openNotification({
              message: `Error !! only ${maxPerWallet} p/wallet`,
              severity: AlertSeverity.ERROR,
            })
          );
          dispatch(setIsMinting(false));
          return;
        }

        let count = qty;
        if (
          parseInt(totalMinted._hex, 16) < parseInt(freeMints._hex, 16) &&
          parseInt(qtyFreeMinted._hex, 16) <= 0
        ) {
          count = qty - 1;
        }
        console.log(count);

        let mintPrice = count * parseFloat(ethers.utils.formatEther(price));
        console.log(mintPrice);

        const nftTxn = await connectedContract.welcomeToHell(qty, {
          value: ethers.utils.parseEther(mintPrice.toString()),
        });

        await nftTxn.wait();
        console.log(nftTxn);
        dispatch(setIsMinting(false));
      } else {
        console.log("Ethereum object doesn't exist");
        dispatch(
          openNotification({
            message: 'Plz install Metamask',
            severity: AlertSeverity.ERROR,
          })
        );
      }
    } catch (error) {
      dispatch(
        openNotification({
          message: 'Error try again',
          severity: AlertSeverity.ERROR,
        })
      );
      console.log(error);
      dispatch(setIsMinting(false));
    }
  };

  return (
    <Box position="relative">
      <Grid mb="20px" container textAlign="center" alignItems="center">
        <Grid item xs={4} textAlign="end">
          <IconButton
            onClick={onClickDecrement}
            size="small"
            sx={{
              color: 'white',
              background: 'linear-gradient(#f12711, #f5af19)',
              fontWeight: 'bold',
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
          >
            <FaMinus />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <Typography
            fontWeight="bold"
            variant="h4"
            sx={{
              background: '-webkit-linear-gradient(#f12711, #f5af19)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            {qty}
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="start">
          <IconButton
            size="small"
            onClick={onClickIncrease}
            sx={{
              color: 'white',
              background: 'linear-gradient(#f12711, #f5af19)',
              fontWeight: 'bold',
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
          >
            <FaPlus />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container alignItems="center" textAlign="center">
        <Grid item xs={3} />
        <Grid item xs={6}>
          <LoadingButton
            sx={{
              fontWeight: 'bold',
              borderRadius: '100px',
              background: 'linear-gradient(#f12711, #f5af19)',
              '&:focus': {
                background: '#af321c',
                transition: 'background 500ms linear',
              },
              '&:hover': {
                background: '#af321c',
                transition: 'background 500ms linear',
              },
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
            }}
            loading={isMinting}
            color="primary"
            fullWidth
            disabled={account.length <= 0}
            variant="contained"
            onClick={onClickMint}
          >
            {isMinting ? 'Entering' : 'Enter to Hell'}
          </LoadingButton>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Box>
  );
};

export default MintSection;
