import mongoose from 'mongoose';
import unique_validator from 'mongoose-unique-validator';
import { db_contrast } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let recording_schema = new Schema({
    title: { type: String, unique: true, required: true },
    title_emoji: { type: String, required: true },
    product: { type: String, required: true },
    comment: { type: String, default: "" },
    user_id: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
    review_method: { type: String, default: 'ab' },
    is_hidden: { type: Boolean, default: false }
},
    {
        collection: 'recordings'
    }
)
recording_schema.plugin(unique_validator, { message: 'Title already used.' });

export default db_contrast.model('Recording', recording_schema);
