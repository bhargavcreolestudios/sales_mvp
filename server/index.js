const express = require('express');
const chalk = require('chalk');
const log = require('./config/helper');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Customer');
require('./models/Contact');

app.use(bodyParser.json());
app.use(cors());

/* Mongoose connect function */
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/sales_mvp`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

/* ROUTES */
require('./routes/customerRoutes')(app);

/* For the serving the static file no need  for this case */

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   const path = require('path');
//   app.get('*', (req,res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })

// }

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  log(chalk.green.bold(` App running on port ${PORT}`));
});
