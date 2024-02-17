import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './Login.module.scss';
import { fetchAuth } from '../../redux/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmitHandler = (values) => {
    dispatch(fetchAuth(values));
  };

  console.log(isValid);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log in into account
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          className={styles.field}
          label="E-mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          type="password"
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </Paper>
  );
};
