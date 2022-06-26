const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const port = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// app.use(cors({
//   origin: "*",
//   optionsSuccessStatus: 200
// })); 

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Endpoint not found' });
});

app.listen(port, () => console.log('Server running'));