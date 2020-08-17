import mongoose from 'mongoose';
import unique_validator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

let user_schema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: String
},
  {
    collection: 'users'
  }
)
user_schema.plugin(unique_validator, { message: 'Name already in use.' });

export default mongoose.model('User', user_schema);