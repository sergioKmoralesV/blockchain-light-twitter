import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import FlipMove from 'react-flip-move';
import TweetInput from './tweetInput';
import TwitterContractAddress from '../config';
import Twitter from '../utils/TwitterContract.json';
import Post from './post';

const Feed = ({ isAccConnected, connectAction }) => {
  const [posts, setPosts] = useState([]);

  const getStructuredTweets = (allTweets, address) => {
    const updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i += 1) {
      if (allTweets[i].userName.toLowerCase() === address.toLowerCase()) {
        const tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].userName,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        const tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].userName,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets.reverse();
  };

  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);
        const allTweets = await TwitterContract.readTweets();
        setPosts(getStructuredTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweet = (key) => async () => {
    console.log('Deleting this tweet', key);
    // Now we got the key, let's delete our tweet
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

        TwitterContract.deleteTweet(key);
        const allTweets = await TwitterContract.getAllTweets();
        setPosts(getStructuredTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, [posts]);

  return (<Grid container direction='column' display='flex' flexShrink={1} padding={'20px 0'} height={'100%'}
                width={'calc(100% - 800px)'} minWidth={400}>
    <Typography variant='h5' fontWeight={600} lineHeight={'60px'} padding={'0 20px'}> Home </Typography>
    {isAccConnected && <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'column',
      padding: '0 20px',
    }}>
      <Button color='primary' variant='contained' fullWidth={false} type={'submit'} sx={{
        textTransform: 'none', marginBottom: '10px',
      }} onClick={connectAction}>
        Connect to a Metamask account first
      </Button>
      <Typography variant='caption'> Connect to Goerly chain. If you disconnect, reload the page </Typography>
    </div>}
    <TweetInput isDisabled={isAccConnected} onSubmitFunc={getAllTweets} />
    <div style={{
      width: '100%',
      height: 'calc(100vh - 232px)',
      maxHeight: 'calc(100vh - 232px)',
      overflowY: 'scroll',
    }}>
      <FlipMove sx={{
        width: '100%', maxWidth: 400, bgcolor: 'background.paper',
      }}>
        {
          posts.map((p) => <Post key={p.id} {...p}
                                 onSubmitFunc={getAllTweets}
                                 onDelete={deleteTweet(p.id)} />)
        }
      </FlipMove>
    </div>
  </Grid>);
};

Feed.propTypes = {
  isAccConnected: PropTypes.bool.isRequired,
  account: PropTypes.string,
  connectAction: PropTypes.func.isRequired,
};

export default Feed;
