import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import TweetInput from './tweetInput';
import TwitterContractAddress from '../config';
import Twitter from '../utils/TwitterContract.json';

const Feed = ({ isAccConnected, connectAction }) => {
  const [posts, setPosts] = useState([]);

  // const getUpdatedTweets = (allTweets, address) => {
  //   const updatedTweets = [];
  //   // Here we set a personal flag around the tweets
  //   for (let i = 0; i < allTweets.length; i += 1) {
  //     if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
  //       const tweet = {
  //         id: allTweets[i].id,
  //         tweetText: allTweets[i].tweetText,
  //         isDeleted: allTweets[i].isDeleted,
  //         username: allTweets[i].username,
  //         personal: true,
  //       };
  //       updatedTweets.push(tweet);
  //     } else {
  //       const tweet = {
  //         id: allTweets[i].id,
  //         tweetText: allTweets[i].tweetText,
  //         isDeleted: allTweets[i].isDeleted,
  //         username: allTweets[i].username,
  //         personal: false,
  //       };
  //       updatedTweets.push(tweet);
  //     }
  //   }
  //   return updatedTweets;
  // };
  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer,
        );

        console.log(signer, TwitterContract);
        const allTweets = await TwitterContract.readTweets();
        setPosts(allTweets);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);
  useEffect(() => {
    getAllTweets();
  }, []);

  const a = true;
  return (
    <Grid container direction='column' display='flex' flexShrink={1} padding={'20px'} height={'100%'}
          width={'calc(100% - 800px)'}>
      <Typography variant='h5' fontWeight={600} lineHeight={'60px'}> Home </Typography>
      {isAccConnected && <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        flexDirection: 'column',
      }}>
        <Button color='primary' variant='contained' fullWidth={false} type={'submit'} sx={{
          textTransform: 'none', marginBottom: '10px',
        }} onClick={connectAction}>
          Connect to a Metamask account first {a}
        </Button>
        <Typography variant='caption'> Connect to Goerly chain. If you disconnect, reload the page </Typography>
      </div>}
      <TweetInput isDisabled={isAccConnected} />
    </Grid>);
};

Feed.propTypes = {
  isAccConnected: PropTypes.bool.isRequired,
  account: PropTypes.string,
  connectAction: PropTypes.func.isRequired,
};

export default Feed;
