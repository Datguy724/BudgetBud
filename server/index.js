const express = 'require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('react');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'supersecretkey'; // Replace with your own secret key

app.use(cors());
app.use(express.json());

let users = []; // In-memory user storage (for demonstration purposes only)
let currentUserTokens = {}; // Store tokens for logged-in users

const generateToken = (user) => {
    return jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    };

let userIdCounter = 1; // Simple counter for user IDs   

app.post('api/auth/register', (req, res) => {
    const { username, email, password } = req.body;

    const userExists = users.some(u => u.username === username || u.email === email);
    if (userExists) {
        return res.status(400).json({ 
            status: "error",
            message: 'Username or email already exists'
        });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        user_id: userIdCounter++,
        username,
        email,
        password: hashedPassword
    };
    users.push(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
        status: "success",
        message: 'User registered successfully',
        user: {
            user_id: newUser.user_id,
            username: newUser.username,
            email: newUser.email
        },
        token
    });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password} = req.body;
    const user = users.find(u => u.username === username);  

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
            status: "error",
            message: 'Invalid username or password'
        });
    }
    const token = generateToken(user);

    res.status(200).json({
        status: "success",
        message: 'Login successful',
        token,
        user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        },
        token
    });
});

app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "error",
            message: 'Missing or invalid token'
        });
    }
    const token = authHeader.split(' ')[1];
    currentUserTokens[token] = true;

    res.status(200).json({
        status: "success",
        message: 'Logout successful'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 