const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const database = require('./config/database');
const seekerRoutes = require('./routes/seekerRoutes');
const providerRoutes = require('./routes/providerRoutes');
const jobRoutes = require('./routes/jobRoutes');
const otpRoutes = require('./routes/otpRoutes');

const PORT = process.env.PORT || 4000;

dotenv.config();
database.connect();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running up...",
  });
});

app.use('/api/job-seeker', seekerRoutes);
app.use('/api/job-provider', providerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/otp', otpRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
  
