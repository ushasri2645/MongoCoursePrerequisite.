import mongoose, { Connection } from "mongoose";
export const config: Connection = mongoose.createConnection('mongodb://localhost/mongoDB1');
console.log("Connected")
// config.on('connected', () => console.log('connected to mongoDB1'));
        
