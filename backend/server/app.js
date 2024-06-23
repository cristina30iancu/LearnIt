
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;  

//  middleware
app.use(cors()); 
app.use(express.json()); 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.params);
    next();
});

const User = require('./models/userModel');
const Quiz = require('./models/quizz');
const Score = require('./models/score');
const Feedback = require('./models/feedback');
const Task = require('./models/taskModel');

AdminJS.registerAdapter(AdminJSMongoose);
const adminOptions = {
    resources: [User, Quiz, Score, Feedback, Task],
    dashboard: {
        component: AdminJS.bundle('./dashboard-component'),
    },
    branding: {
        companyName: 'LearnIt Admin',
    },
};
const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(admin);
// admin.bundle(path.join(__dirname, 'dashboard-component.jsx'), 'dashboard-component.jsx');

app.use(admin.options.rootPath, adminRouter);

// Conectarea la MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectat cu succes la baza de date MongoDB');

    app.listen(port, () => {
        console.log(`Serverul rulează pe portul ${port}`);
    });
})
.catch(err => {
    console.error('Eroare la conectarea la baza de date:', err);
});

const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Eroare la verificarea token-ului:', error);
        return null;
    }
};


exports.createToken = createToken;
exports.verifyToken = verifyToken;


const quizRoutes = require('./rute');  
app.use('/api', quizRoutes);
const authRoutes = require('./ruteAuth');  // Comentează sau decomentează în funcție de necesități
app.use('/api', authRoutes);
const feedbackRouter = require('./ruteFeedback');
app.use('/api', feedbackRouter);
const taskRoutes = require('./ruteTask');
app.use('/api', taskRoutes);