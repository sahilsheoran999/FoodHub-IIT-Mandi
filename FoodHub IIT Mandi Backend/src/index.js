const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoutes');
// const User = require('./schema/userSchema');

const app = express();

// CORS configuration supporting configured frontend URL, vercel.app domains, and local dev
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin) return callback(null, true);
        if (ServerConfig.ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        // Also allow vercel.app preview and production deployments
        if (origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        // Allow local development
        if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
            return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Automatic database connection middleware for serverless invocations
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection error in request:", err.message);
        // Continue to let fallback handlers work (e.g. fallback static products)
        next();
    }
});

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
app.use('/users', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/ping', (req, res) => {
    return res.json({ message: "pong" });
});

app.get('/', (req, res) => {
    res.json({
        status: 'FoodHub IIT Mandi Backend is running!',
        routes: [
            '/ping',
            '/products',
            '/products/:id',
            '/users',
            '/auth',
            '/carts',
            '/orders'
        ]
    });
});

const PORT = process.env.PORT || ServerConfig.PORT || 8080;

// Only start listening when executed directly, not when required by Vercel serverless functions
if (require.main === module) {
    app.listen(PORT, async () => {
        try {
            await connectDB();
        } catch (e) {
            console.log("Database connection error on startup:", e.message);
        }
        console.log(`Server started at port ${PORT}...!!`);
    });
}

module.exports = app;
