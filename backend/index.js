import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

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

app.post('/auth/login', registerValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();

  res.json(user);
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is fine');
});
