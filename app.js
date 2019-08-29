import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', Routes);


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to WayFarer API',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`WayFarer-API started on port ${port}`);
});


export default app;
