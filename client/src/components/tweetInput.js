import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';

const TweetInput = () => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
  });

  const [errorMsg] = useState(null);

  async function onSubmit(values) {
    console.log(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{
        width: '100%',
        marginBottom: 10,
      }}>
        <TextField
          placeholder='Write your tweet here'
          autoFocus
          fullWidth
          autoComplete={false}
          {...register('tweetText', {
            required: 'Tweet cannot be empty',
          })}
        />
      </div>
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'flex-end',
      }}>
        <Button color='primary' variant='contained' type={'submit'} sx={{
          textTransform: 'none',
        }}>
          Tweet
        </Button>
        <Typography variant='caption' color='error'>
          {errorMsg || ''}
        </Typography>
      </div>
    </form>);
};

export default TweetInput;
