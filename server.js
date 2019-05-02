const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: "postgres://sfrzheuevahonp:9f82011f66ed8b4ffe57cc3868a187c6833408d57d59295962962a7cbc1d2701@ec2-184-72-237-95.compute-1.amazonaws.com:5432/ddlnifiopiel5f",
    ssl: true,
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', ( req , res ) => {	res.send('This is working!'); })
app.post('/signin' , (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl' , (req, res) => {image.handleApiCall(req, res)} )


app.listen(process.env.PORT || 3000, () => {
	console.log('App is running on port ${process.env.PORT}.');
})
