const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sorngsiyou:rHwz2e4vphZhqyQx@cluster0.6tyefgy.mongodb.net/dictionarydb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));