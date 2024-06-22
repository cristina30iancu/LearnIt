const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ msg: 'Utilizatorul există deja' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullName: name,
        email,
        password: hashedPassword,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ msg: 'Date invalide' });
    }
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Utilizator negăsit!" })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).json({ msg: "Parolă greșită!" });
    }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('Utilizatorul nu a fost găsit');
    }
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('Utilizatorul nu a fost găsit');
    }
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        await user.remove();
        res.json({ message: 'Utilizatorul a fost șters' });
    } else {
        res.status(404);
        throw new Error('Utilizatorul nu a fost găsit');
    }
});