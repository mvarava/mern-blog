import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Registration.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmitHandler = async (values) => {
    const data = dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Failed to sign up');
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Creating account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter full name' })}
          className={styles.field}
          label="Full name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          type="email"
          className={styles.field}
          label="E-mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          type="password"
          className={styles.field}
          label="Password"
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
