import express, { application } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import {createEmployee} from './controllers/management.js';
import { employeeLogin, createMerchant, getMyMerchants, getMerchants, getUser } from './controllers/employee.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:6969',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const PORT = process.env.PORT || 6000;


//management routes

app.post('/mgt/create-employee', createEmployee);


//employee routes
app.post('/emp/employee-login', employeeLogin);
app.post('/emp/create-merchant', createMerchant);
app.get('/emp/merchants', getMerchants);
app.get('/emp/my-merchants/:id', getMyMerchants);
app.get('/emp/user/:id', getUser);

//merchant routes


//user routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//database connection and server on

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`App Running On Port: ${PORT}`)
  })
}).catch((error) => console.log(`${error} : App did not connect to the database!`));