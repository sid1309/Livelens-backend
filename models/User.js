const mongoose = require('mongoose'); //Object Data Modeling (ODM) tool for MongoDB.
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
});

//hashing brefore saving password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);

//.pre() is a Mongoose middleware function..pre('save', callback)Means Run this function before the document is saved to the database.
//If the password is not modified, then skip hashing and move on