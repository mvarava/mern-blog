import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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

app.get('/', (req, res) => {
  res.send('This is where the fun begins');
});

app.post('/auth/login', (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
    },
    'secret4444',
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is fine');
});
