import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', Routes);


app.get('/', (req, res) => {
	res.status(200).send({
		message: 'Welcome to WayFarer-API',
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`WayFarer-API started on port ${port}`);
});










// const jwt = require('jsonwebtoken');
// const role=require('./role');

// module.exports = function (req, res, next) {
// const token = req.header('x-auth-header');
// if (!token) 
//     return res.status(401)
//     .send('Access Denied: No Token Provided!');
// try {
// const decoded = jwt.verify(token, "secretkey");
// if(role[decoded.role]
//     .find(function(url){ 
//         return url==req.baseUrl})){req.user=decoded
// next();
// }
// else
// return res.status(401)
// .send('Access Denied: You dont have correct privilege to perform this operation');}
// catch (ex) {
// res.status(401).send('Invalid Token')
// }}

export default app;