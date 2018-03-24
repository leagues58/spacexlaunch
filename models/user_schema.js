/*****************************************************************************
user_schema.js
Schema declaration for an admin user.  The site will have no ordinary users
per se, but there do need to be admin users to add/edit launches.  These admin
users will have accounts and privileges to view the page which lets you do 
this.
******************************************************************************/

var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');

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
  }
});
var User = mongoose.model('User', UserSchema);

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

module.exports = User;


