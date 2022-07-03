import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import TwitterContractAddress from '../config';
import Twitter from '../utils/TwitterContract.json';

const EditPostInput = ({ onSubmitFunc, tweet, onCancel }) => {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      tweetText: tweet.tweetText,
    },
  });

  async function onSubmit(values) {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        TwitterContract.updateTweet(tweet.id, values.tweetText).then(() => {
          console.log('Tweet updated successfully');
          onCancel();
          if (onSubmitFunc) {
            onSubmitFunc();
          }
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error updating Tweet', error);
    }
  }

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <div style={{
      width: '100%', marginBottom: 10, padding: '0 20px',
    }}>
      <TextField
        placeholder='Write your tweet here'
        autoFocus
        fullWidth
        {...register('tweetText', {
          required: 'Tweet cannot be empty',
        })}
      />
    </div>
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 20px 20px 20px',
    }}>
      <Button color='primary' variant='contained' type={'submit'} sx={{
        textTransform: 'none',
        marginRight: '10px',
      }}
      >
        Update tweet
      </Button>
      <Button
        onClick={onCancel}
        color='secondary' variant='contained'
        sx={{
          textTransform: 'none',
        }}
      >
        Cancel
      </Button>
    </div>
  </form>);
};

EditPostInput.propTypes = {
  onSubmitFunc: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  tweet: PropTypes.object.isRequired,
};

export default EditPostInput;
