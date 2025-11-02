import express from 'express';
import connectDB from './config/db.js';

import chatRoutes from './routes/chat.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

// Connect DB
connectDB();

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Serveur backend sur http://localhost:${PORT}`));
