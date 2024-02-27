import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
// Next five lines required to resolve .env file in root
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// HELPER FUNCTION TO GET DATE
const getTime = () => {
  const tempTime = new Date();

  const convert = (num) => {
    if (num > 9) return num.toString();
    return '0' + num;
  };

  const year = tempTime.getFullYear();
  // Months are reported as 0 - 11;
  const month = convert(tempTime.getMonth() + 1);
  const date = convert(tempTime.getDate());

  const time = year + '_' + month + '_' + date;

  return time;
};

const URI = process.env.MONGO_URI;

const mongoConnect = async () => {
  await mongoose
    .connect(URI, {
      dbName: 'Nemo',
    })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));
};

//mongoConnect();

const Schema = mongoose.Schema;
const dbObj = new Schema({
  time: { type: String, required: true },
  NODE_ARRAY: { type: Array, required: true },
  POD_ARRAY: { type: Array, required: true },
});

const nodeArray = mongoose.model(`clusterInfo_${getTime()}`, dbObj);

export default nodeArray;
