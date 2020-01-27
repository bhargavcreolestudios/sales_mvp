const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Customer');

var cors = require('cors');
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/sales_mvp`, {useUnifiedTopology: true, useNewUrlParser: true});

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/customerRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});