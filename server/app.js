import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectDB  from "./config/db.js";
import Stripe from "stripe";
import helmet from "helmet";
import MongoSanitize from "express-mongo-sanitize";


// dot env config
dotenv.config();
//database connection
connectDB();

/// stripe Configuration 
export  const stripe = new Stripe(process.env.STRIPE_API_SECRET)


//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true               // allow sending cookies
}));


//middlewares
app.use(MongoSanitize())
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());

//route

//routes imports
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import sanitize from "mongo-sanitize";

app.use("/api", testRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)

//port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);

  console.log(
    `Server Running On PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`
      .bgMagenta.white
  );

});



