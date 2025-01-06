const express = require('express');
const router = express.Router();
const axios = require('axios');

const Password = require('../models/password');

router.use(express.urlencoded({ extended: true }));

// Get all passwords
router.get('/', async (req, res) => {
    let passwords = await Password.find();
    res.json(passwords);
});

// Save a password
router.post('/', async (req, res) => {
    try {
        let userId = "6712b613abfb4ad85f770072";
        const { site, email, password } = req.body;

        if (!site || !email || !password || !userId) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const newCredential = new Password({ site, email, password, userId });

        const savedCredential = await newCredential.save();

        res.status(201).json({ success: true, result: savedCredential });
    } catch (error) {
        console.error('Error adding credential:', error);

        res.status(500).json({ success: false, message: 'An error occurred while adding the credential.', error: error.message });
    }
});

// Delete Password by id
router.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        console.log("A delete request with id: ", id);

        if (!id) {
            return res.status(400).json({ success: false, message: 'ID is required to delete a password.' });
        }

        // Delete the document by ID
        const deletedResult = await Password.findByIdAndDelete(id);

        if (!deletedResult) {
            return res.status(404).json({ success: false, message: 'Password not found.' });
        }

        res.status(200).json({ success: true, message: 'Password deleted successfully.', result: deletedResult });
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the password.', error: error.message });
    }
});

module.exports = router;