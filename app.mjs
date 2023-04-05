
import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './routes/homeRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import categoryRoutes from './routes/categoryRoutes.mjs';
import flash from "connect-flash"
import mongoose from 'mongoose';

const app = express();


dotenv.config();
//session
const sessionStore = MongoDBStore(session);

const Store = new sessionStore({
    uri: process.env.CONNECT_MONGODB,
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret secret to hash express session .....',
    saveUninitialized: false,
    store: Store,
  }))
  
  
  
  app.use(flash()) // for errors
  
  // assets files
  const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', homeRoutes);
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', authRoutes);
app.use('/', cartRoutes);


mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
  app.listen(8080, () => {
    console.log('Server is running');
  });
}).catch(() => {
  console.log('faild connect mongodb')
})
