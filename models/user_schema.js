/*****************************************************************************
user_schema.js
Schema declaration for an admin user.  The site will have no ordinary users
per se, but there do need to be admin users to add/edit launches.  These admin
users will have accounts and privileges to view the page which lets you do 
this.
******************************************************************************/

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;


