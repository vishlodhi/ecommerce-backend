import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

/* App Config */
const app = express();
const port = process.env.PORT || 4000;

/* Middleware */
app.use(cors({
    origin: [
        'http://localhost:5174',
        'https://ecommerce-backend-cut4z0z7n-vishu-project.vercel.app/'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

/* Database Connections */
connectDB();
connectCloudinary();

/* API Endpoints */
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

/* Local Server */
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server started on port : ${port}`);
    });
}

/* Vercel Export */
export default app;