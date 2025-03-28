const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { verifyToken, isAdmin, isEditor, isUser, } = require('./authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8100'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Define User Model inside server.js
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already exists" });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword, role: role || 'user' });
        await newUser.save();

        res.status(201).json({ message: "User Registered" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/protected', verifyToken, (req, res) => {
    try {
        res.json({
            message: "Access to protected data granted",
            user: {
                id: req.user.id,  
                username: req.user.username,
                role: req.user.role,
                accessTime: new Date().toISOString()
            },
            protectedContent: {
                confidentialInfo: "This is some sensitive information only accessible to authenticated users.",
                availableFeatures: ["Feature A", "Feature B", "Feature C"],
                securityLevel: "High"
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving protected data", error: error.message });
    }
});

app.get('/user', verifyToken, isUser, (req, res) => {
    res.send('User Area');
});

app.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.send('Admin Area');
});

app.get('/editor', verifyToken, isEditor, (req, res) => {
    res.send('Editor Area');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
