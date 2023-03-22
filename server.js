import express from 'express';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import dotenv from 'dotenv'
import connectDB from './db/connect.js';
import authRouter from './routes/authRoute.js'
import jobsRouter from './routes/jobsRouter.js'
import 'express-async-errors';  //this package will act as next . no need to setup try/catch in authcontroller
import morgan from 'morgan';
import authenticateServer from "./middleware/auth.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser'
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

const app=express()

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  //for deploying
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json())  //makes all post data into json
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
dotenv.config();

//middleware
notFoundMiddleware

//when deploying
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateServer,jobsRouter) //details shoudlbe be displayed in request header of dev tool thats why heading
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 5000
 
app.listen(port,()=>{
    console.log(`server is listening in ${port}`)
})

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(()=>{
            console.log(`db server is listening in ${port}`)
        })
    }catch(error){
      console.log("DB not connected",error)
    }
}
start()