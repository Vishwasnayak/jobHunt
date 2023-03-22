import mongoose from 'mongoose';

//mongoose connect will return a promise
const connectDB=(url) =>{
    return mongoose.connect(url)
}

export default connectDB