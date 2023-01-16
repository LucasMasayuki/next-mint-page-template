import { Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import Contracts from 'utils/Contracts.json';
import { CONTRACT_ADDRESS } from 'utils/constants';
import {
  useAppDispatch,
  useAppSelector,
} from '../../src/presentation/app/hooks';
import {
  selectAuth,
  setAccount,
} from '../../src/presentation/stores/auth-slice';
import {
  AlertSeverity,
  openNotification,
} from '../../src/presentation/stores/notification-slice';
import AppModal from './app-modal';
import AppMenu from './menus/app-menu';

const AccountButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector(selectAuth);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getCurrentAccount = async (): Promise<void> => {
      const { ethereum } = window;
      if (!ethereum) {
        dispatch(
          openNotification({
            message: 'Plz install Metamask',
            severity: AlertSeverity.ERROR,
          })
        );
        dispatch(setAccount(''));
        return;
      }

      const accounts = (await ethereum.request({
        method: 'eth_accounts',
      })) as string[];

      if ((accounts?.length ?? 0) !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        dispatch(setAccount(account));
        await setupEventListener();

        ethereum.on('accountsChanged', function (accounts: any[]) {
          console.log('Changed an authorized account:', accounts[0]);
          dispatch(setAccount(accounts[0]));
        });

        return;
      }
    };

    getCurrentAccount();
  }, [dispatch]);

  const onClickConnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        dispatch(
          openNotification({
            message: 'Plz install Metamask',
            severity: AlertSeverity.ERROR,
          })
        );
        return;
      }

      const accounts = (await ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      console.log('Connected', accounts[0]);
      dispatch(setAccount(accounts[0]));

      ethereum.on('accountsChanged', function (accounts: any[]) {
        console.log('Changed an authorized account:', accounts[0]);
        dispatch(setAccount(accounts[0]));
      });

      await setupEventListener();
    } catch (error) {
      dispatch(
        openNotification({
          message: 'Plz install Metamask',
          severity: AlertSeverity.ERROR,
        })
      );
      console.log(error);
    }
  };

  const setupEventListener = async () => {
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

        connectedContract.on('NewAkuma', (sender) => {
          if (sender === account) {
            dispatch(
              openNotification({
                message: 'Success !!! Welcome',
                severity: AlertSeverity.SUCCESS,
              })
            );
          }
        });
      } else {
        dispatch(
          openNotification({
            message: 'Plz install Metamask',
            severity: AlertSeverity.ERROR,
          })
        );
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
      dispatch(
        openNotification({
          message: 'Error, try again',
          severity: AlertSeverity.ERROR,
        })
      );
    }
  };

  const onClickLogout = () => {
    dispatch(setAccount(''));
    handleClose();
  };

  return (
    <>
      <AppModal
        open={open}
        handleClose={() => setOpen(false)}
        showCloseButton
        modalName="Minted"
      >
        <>
          <Typography variant="subtitle1">
            Successfully minted, GOOD LUCK INVESTOR.
          </Typography>
          <br />
          <Typography variant="body1">
            Follow us on twitter and enable notifications.
          </Typography>
        </>
      </AppModal>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '100px',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
          p: 1,
          maxWidth: { xs: '100%', md: '200px' },
        }}
        onClick={account != '' ? handleClick : onClickConnectWallet}
      >
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {account != '' ? account : 'Connect wallet'}
        </Typography>
      </Button>
      <AppMenu anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={onClickLogout}>
          <ListItemIcon>
            <FaArrowCircleRight />
          </ListItemIcon>
          Logout
        </MenuItem>
      </AppMenu>
    </>
  );
};

export default AccountButton;
