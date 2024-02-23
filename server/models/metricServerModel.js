import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'Nemo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const tempTime = new Date();

const convert = (num) => {
  if (num > 9) return num.toString();
  return '0' + num;
};

const hour = convert(tempTime.getHours());
const min = convert(tempTime.getMinutes());
const sec = convert(tempTime.getSeconds());

const time = hour + ':' + min + ':' + sec;

const metrics = new mongoose.Schema({
  time: { type: String, default: time },
  NODE_NAME: { type: String, required: true },
  POD_NAME: { type: String, required: true },
  UID: { type: Number, required: true },
  CREATED_AT: { type: Number, required: true },
  CPU_USAGE_CORES: { type: Number, required: true },
  MEMORY_USAGE_BYTES: { type: Number, required: true },
  CONTAINER_COUNT: { type: Number, required: true },
  CONDITIONS: { type: String, required: true },
});

export default mongoose.model('metrics', metrics);
