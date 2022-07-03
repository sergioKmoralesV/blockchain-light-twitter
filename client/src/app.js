import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import Sidebar from './components/sidebar';
import Feed from './components/feed';
import Widgets from './components/widgets';

function App() {
  const [currentAcc, setCurrentAcc] = useState('');
  const [network, setNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }

      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });
      console.log('Connected to chain:', chainId);

      const goerlyChainId = '0x4';
      if (chainId !== goerlyChainId) {
        setNetwork(false);
        console.error('You are not connected');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Found account', accounts[0]);
      setCurrentAcc(accounts[0]);
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;

    const chainId = await ethereum.request({
      method: 'eth_chainId',
    });
    console.log('Connected to chain:', chainId);

    const goerlyChainId = '0x1';

    if (chainId !== goerlyChainId) {
      setNetwork(false);
    } else {
      setNetwork(true);
    }
  };

  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  }, [currentAcc, network]);

  return (<Stack
    position='fixed'
    display='flex'
    sx={{
      width: '100%', height: '100%', padding: '0 240px', overflowY: 'auto',
    }}
  >
    <div
      style={{
        height: '100%',
        minHeight: '100%',
        maxHeight: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Sidebar />
      <Feed isAccConnected={isEmpty(currentAcc)} account={currentAcc}
            connectAction={connectWallet} />
      <Widgets />
    </div>
  </Stack>);
}

export default App;
