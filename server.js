const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✨ Passion Academy Engine is Online & Connected!"))
    .catch(err => console.error("❌ Connection Error:", err.message));

// --- DEPARTMENT 1: ADMISSIONS ---

// 2. Student Schema
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    level: String,
    phone: String,
    message: String,
    dateApplied: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// 3. POST Route: Receive Admission Applications
app.post('/api/apply', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Application saved successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. GET Route: Get all students for Dashboard
app.get('/api/students', async (req, res) => {
    try {
        const allStudents = await Student.find().sort({ dateApplied: -1 });
        res.json(allStudents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DEPARTMENT 2: CONTACT MESSAGES ---

// 5. Message Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    dateSent: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// 6. POST Route: Receive Contact Us Messages
app.post('/api/contact', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 7. GET Route: Get all messages for Dashboard
app.get('/api/messages', async (req, res) => {
    try {
        const allMessages = await Message.find().sort({ dateSent: -1 });
        res.json(allMessages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- NAVIGATION ---

// Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// This tells the app: "Use the Internet's port, OR 5000 if I'm testing at home"
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Passion Academy is LIVE on port ${PORT}`);
});