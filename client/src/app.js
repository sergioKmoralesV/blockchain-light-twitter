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
      }

      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });
      console.log('Connected to chain:', chainId);

      const goerlyChainId = '0xc1d25746A1F02D8d0Fc73fff8B5F3Df1113305C5';
      if (chainId !== goerlyChainId) {
        setNetwork(false);
        console.error('Not connected');
      } else {
        setNetwork(true);
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Found account', accounts[0]);
      setCurrentAcc(accounts[0]);
      console.log(currentAcc, network);
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [currentAcc]);

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
        width: 'calc(100% - 240px)',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Sidebar />
      <Feed isAccConnected={isEmpty(currentAcc)} account={currentAcc} />
      <Widgets />
    </div>
  </Stack>);
}

export default App;
