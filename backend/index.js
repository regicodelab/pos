const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
require('dotenv').config();

const usersRouter = require('./src/routes/user');
const businessesRouter = require('./src/routes/business');
const authRouter = require('./src/routes/auth');
const productsRouter = require('./src/routes/products');
const tablesRouter = require('./src/routes/tables');
const ordersRouter = require('./src/routes/orders');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',authRouter);
app.use('/api/users', usersRouter);
app.use('/api/businesses', businessesRouter);
app.use('/api/products', productsRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});