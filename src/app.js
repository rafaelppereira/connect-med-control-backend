const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const apiRoutes = require('./routes/api');

dotenv.config();
const app = express();
  
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Endpoint not found' });
});

app.listen(8080, () => console.log('Server running on port ' + 8080));