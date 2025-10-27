import mongoose from 'mongoose';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import TourModel from '../src/models/tour.model.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './../.env',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.MONGO_URI).then(() => 'DB connection successful');

const dataPath = join(__dirname, '../data/tours.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const toursData = JSON.parse(rawData.replace(/^\uFEFF/, ''));

export const importData = async () => {
  try {
    await TourModel.create(toursData);
    console.log('Data successfully imported');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await TourModel.deleteMany();
    console.log('Data successfully deleted!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
