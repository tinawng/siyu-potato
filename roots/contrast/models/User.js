import mongoose from 'mongoose';
import unique_validator from 'mongoose-unique-validator';
import { db_contrast } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let user_schema = new Schema({
  email: { type: String, unique: true, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  profile_picture: { type: String },
  group_id: { type: Schema.Types.ObjectId, required: true, default: mongoose.Types.ObjectId("60dd6b0cc8be940988d5b912") },
},
  {
    collection: 'users'
  }
)
user_schema.plugin(unique_validator, { message: 'Email address already used.' });

export default db_contrast.model('User', user_schema);