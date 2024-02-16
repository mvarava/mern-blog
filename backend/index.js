import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

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

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
// app.patch('/posts', PostController.remove);
// app.delete('/posts', PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is fine');
});
