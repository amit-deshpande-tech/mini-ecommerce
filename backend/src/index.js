import express from 'express';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('hello world');
});

const PORT = process.env.PORT || 5000;
app.use(express.json());
dotenv.config();
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`your server is listening at port ${PORT}`);
});
