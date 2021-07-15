import mongoose from 'mongoose';
import { db_yubin } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let mail_schema = new Schema({
  messageId: { type: String, unique: true, required: true },
  html: { type: String, required: true },
  text: { type: String, required: true },
  textAsHtml: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  to: { type: Schema.Types.Mixed },
  from: { type: Schema.Types.Mixed },
},
  {
    collection: 'mails'
  }
)

export default db_yubin.model('Mail', mail_schema);