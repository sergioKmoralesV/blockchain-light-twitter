import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import TwitterContractAddress from '../config';
import Twitter from '../utils/TwitterContract.json';
import { secondaryColor } from '../lib/theme';

const TweetInput = ({ isDisabled }) => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
  });

  const [errorMsg] = useState(null);

  async function onSubmit(values) {
    console.log(values);

    const tweet = {
      tweetText: values.tweetText, isDeleted: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        const twitterTx = await TwitterContract.createTweet(tweet.tweetText, tweet.isDeleted);

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error submitting new Tweet', error);
    }

    if (onSubmit) {
      onSubmit();
    }
    reset();
  }

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <div style={{
      width: '100%', marginBottom: 10, padding: '0 20px',
    }}>
      <TextField
        placeholder='Write your tweet here'
        autoFocus
        fullWidth
        disabled={isDisabled}
        {...register('tweetText', {
          required: 'Tweet cannot be empty',
        })}
      />
    </div>
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      borderBottom: `1px solid ${secondaryColor}`,
      padding: '0 20px 20px 20px',
    }}>
      <Button color='primary' variant='contained' type={'submit'} sx={{
        textTransform: 'none',
      }} disabled={isDisabled}
      >
        Tweet
      </Button>
      <Typography variant='caption' color='error'>
        {errorMsg || ''}
      </Typography>
    </div>
  </form>);
};

TweetInput.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

export default TweetInput;
