import mongoose from 'mongoose';
import { db_contrast } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let review_schema = new Schema({
  sample_id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  content: { type: Schema.Types.Mixed },
  date: { type: Date, default: Date.now },
},
  {
    collection: 'reviews'
  }
)

export default db_contrast.model('Review', review_schema);