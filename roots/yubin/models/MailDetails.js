import mongoose from 'mongoose';
import { db_yubin } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let mail_schema = new Schema({
  mail_id: { type: Schema.Types.ObjectId, unique: true, required: true },
  opened: { type: Boolean },
  important: { type: Boolean },
  deleted: { type: Boolean },
},
  {
    collection: 'mail_details'
  }
)

export default db_yubin.model('MailDetails', mail_schema);