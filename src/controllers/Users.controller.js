// Login with phone only
exports.loginPhone = async (req, res) => {
    const { email, phone, password } = req.body;
    let identifier = email || phone;
    if (!identifier || !password) {
        return res.status(400).send({ message: 'Email or phone and password are required!' });
    }

    User.findByEmail(identifier, (err, user) => {
        if (err || !user) {
            return res.status(404).send({ message: 'Invalid credentials.' });
        }
        if (password !== user.password_hash) {
            return res.status(401).send({ message: 'Invalid credentials.' });
        }
        return res.status(200).send({ userId: user.user_id });
    });
};
/*
exports.loginPhone = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(400).send({ message: 'Phone and password are required!' });
    }

    // Search plain phone
    let phoneString = '';

    User.findByEmail(phoneString, (err, user) => {
        if (err || !user) {
        return res.status(404).send({ message: 'Invalid credentiaals.' + phoneString });
        }
        if (password !== user.password_hash) {
            return res.status(401).send({ message: 'Wrong password or phone number or email.' });
        }
        return res.status(200).send({ userId: user.user_id });
    });
};*/
const User = require('../models/users.model');



// Create a new user
// Removed detectIdentifierType import

exports.create = async (req, res) => {
    const { email, phone, password, name, contact_details } = req.body;
    let identifier = email || phone;
    if (!identifier || !password || !name) {
        return res.status(400).send({ message: "Email or phone, password, and name are required!" });
    }

    // Save plain email or phone
    let emailString = email ? email : phone;

    let userObj = {
        email: emailString,
        password_hash: password,
        name,
        contact_details: contact_details || null,
    };

    try {
        User.create(userObj, (err, data) => {
            if (err) {
                console.error("Error during User.create:", err);
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user.",
                });
            } else {
                res.status(201).send({ message: "User created successfully!", user: data });
            }
        });
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).send({ message: "Internal server error." });
    }
};

// Login functionality
exports.login = async (req, res) => {
    const { email, phone, password } = req.body;
    let identifier = email || phone;
    if (!identifier || !password) {
        return res.status(400).send({ message: 'Email or phone and password are required!' });
    }

    User.findByEmail(identifier, (err, user) => {
        if (err || !user) {
            return res.status(404).send({ message: 'Invalid credentials.' });
        }
        if (password !== user.password_hash) {
            return res.status(401).send({ message: 'Invalid credentials.' });
        }
        return res.status(200).send({ userId: user.user_id });
    });
};

// Fetch all users with balance
exports.findAllWithBalance = (req, res) => {
    console.log("Fetching all users with balances...");
    User.getAllWithBalance((err, data) => {
        if (err) {
            console.error("Error fetching users with balances:", err);
            res.status(500).send({
                message: err.message || "Error occurred while retrieving users with balances.",
            });
        } else {
            console.log("Users fetched successfully:", data);
            res.send(data);
        }
    });
};

// Fetch all users
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
        } else {
            res.send(data);
        }
    });
};

// Fetch a single user by ID
exports.findOne = (req, res) => {
    User.findById(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.user_id}.` });
            } else {
                res.status(500).send({ message: "Error retrieving User with id " + req.params.user_id });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a user by ID
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    User.updateById(req.params.user_id, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.user_id}.` });
            } else {
                res.status(500).send({ message: "Error updating User with id " + req.params.user_id });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a user by ID
exports.delete = (req, res) => {
    User.remove(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.user_id}.` });
            } else {
                res.status(500).send({ message: "Could not delete User with id " + req.params.user_id });
            }
        } else {
            res.send({ message: `User was deleted successfully!` });
        }
    });
};
