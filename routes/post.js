const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kirtimahapatra07:kirti0702@db.9ifn4pv.mongodb.net/?retryWrites=true&w=majority&appName=db");

const postSchema = new mongoose.Schema({
  posttext: {
    type: String,
    required: true,
  },
  image:{
    type: String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports  = mongoose.model('Post', postSchema);


