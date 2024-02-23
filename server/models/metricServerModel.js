import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
// Next five lines required to resolve .env file in root
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const URI = process.env.MONGO_URI;

const mongoConnect = async () => {
  await mongoose
    .connect(URI, {
      dbName: 'Nemo',
    })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));
};

mongoConnect();

const Schema = mongoose.Schema;
const dbObj = new Schema({
  time: { type: String, required: true },
  POD_ARRAY: { type: Array, required: true },
  // NODE_NAME: { type: String, required: true },
  // POD_NAME: { type: String, required: true },
  // UID: { type: Number, required: true },
  // CREATED_AT: { type: Number, required: true },
  // CPU_USAGE_CORES: { type: Number, required: true },
  // MEMORY_USAGE_BYTES: { type: Number, required: true },
  // CONTAINER_COUNT: { type: Number, required: true },
  // CONDITIONS: { type: String, required: true },
});

const nodeArray = mongoose.model('node_Array', dbObj);

export default nodeArray;
