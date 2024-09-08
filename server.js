const express = require('express');
const app = express();
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const loaderRoutes = require('./routes/loaderRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/loader', loaderRoutes);
app.use('/api/products', productRoutes);


app.listen(233, () => {
    console.log('Server running on port 233');
});
