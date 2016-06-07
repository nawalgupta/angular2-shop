// ```
// user.model.js
// ```

// */app/models/user.model.js*

// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Import library to hash passwords
import bcrypt from 'bcrypt-nodejs';

// Define the schema for the showcase item
let userSchema = mongoose.Schema({

    email : { type : String },
    username : { type : String },
    password : String,
    provider: String,
    role : { type : String }


});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function(password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// ### Check if password is valid
userSchema.methods.validPassword = function(password) {

  return bcrypt.compareSync(password, this.password);
};

// Create the model for users and expose it to the app
export default mongoose.model('User', userSchema);
