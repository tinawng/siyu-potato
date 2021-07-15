import mongoose from 'mongoose';
import unique_validator from 'mongoose-unique-validator';
import { db_contrast } from '../../../mongoose.config.js';

const Schema = mongoose.Schema;

let group_schema = new Schema({
    name: { type: String, unique: true, required: true },
    permissions: { type: Array, default: [] }
},
    {
        collection: 'groups'
    }
)
group_schema.plugin(unique_validator, { message: 'Group name already used.' });

export default db_contrast.model('Group', group_schema);