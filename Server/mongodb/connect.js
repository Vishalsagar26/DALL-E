import mongoose from "mongoose";

//connecting mongodatabase using strict mode and inbuilt connect function and passing the url of the local as arguement while calling the function 
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
}

export default connectDB;