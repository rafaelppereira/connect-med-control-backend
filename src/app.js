const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const apiRoutes = require('./routes/api');

dotenv.config();
const app = express();
  
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Endpoint not found' });
});

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));