import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose
  .connect(
    'mongodb+srv://mariavarava176:LZYG5ZaMH8zpiDT5@cluster0.84am5lj.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB is fine');
  })
  .catch((err) => {
    console.log('Error in DB', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login', registerValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is fine');
});
