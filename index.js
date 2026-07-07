import express from 'express';
import 'dotenv/config';
import checkVersion from './midlewares/version.js';

const app = express()

app.use(express.json())
app.use(checkVersion());

app.get('/health', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`App live on port ${process.env.PORT}`)
})