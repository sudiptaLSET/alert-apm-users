import express from 'express';
import "dotenv/config";
import alertRouter from './routes/alert.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('server is running');
});

app.use('/alert', alertRouter);

app.listen(PORT || 8000, () => {
  console.log(`Server listening on port ${PORT}`);
});
