const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const cors=require("cors");
const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

     

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB=require("./config/db");


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));




connectDB();
app.get("/",(req,res)=>{
    res.send("shopnet is running properly");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running in  port ${PORT}`);
});