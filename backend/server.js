const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { PORT, MONGO_URI, CLIENT_ORIGIN } = require('./config');
const planRoutes = require('./routes/planRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const allowedOrigins = [CLIENT_ORIGIN];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/plans', planRoutes);
app.use('/api/feedback', feedbackRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

