// Yardımcı: Email mi telefon mu?
function detectIdentifierType(str) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phoneRegex = /^\d{10,13}$/;
    if (emailRegex.test(str)) {
        return 'email';
    } else if (!str.includes('@') && phoneRegex.test(str)) {
        return 'phone';
    } else {
        return 'invalid';
    }
}

module.exports.detectIdentifierType = detectIdentifierType;
const sql = require('../config/db_config');

const User = function (user) {
    this.email = user.email; // email alanı hem email hem phone stringi tutacak
    this.password_hash = user.password_hash;
    this.name = user.name;
    this.contact_details = user.contact_details;
};

// Create a new user
User.create = (newUser, result) => {
    console.log('New User to Insert:', newUser);
    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.error('SQL Error:', err);
            result(err, null);
            return;
        }
        console.log('User Inserted:', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

//balance göstermek için ekledim
User.getAllWithBalance = (result) => {
    console.log("Executing SQL query to fetch users with balances...");
    const query = `
        SELECT u.user_id, u.name, u.email, u.contact_details, sc.balance
        FROM Users u
        LEFT JOIN Student_Cards sc ON u.user_id = sc.user_id;
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.error("SQL Error:", err);
            result(null, err);
            return;
        }
        console.log("SQL Query Result:", res);
        result(null, res);
    });
};


// Find a user by email
User.findByEmail = (email, result) => {
    sql.query("SELECT * FROM Users WHERE email = ?", [email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result(null, null);
    });
};

// Get all users
User.getAll = (result) => {
    sql.query("SELECT * FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Find a user by ID
User.findById = (id, result) => {
    sql.query("SELECT * FROM Users WHERE user_id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Update a user by ID
User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE Users SET email = ?, password_hash = ?, name = ?, contact_details = ? WHERE user_id = ?",
        [user.email, user.password_hash, user.name, user.contact_details, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...user });
        }
    );
};

// Delete a user by ID
User.remove = (id, result) => {
    sql.query("DELETE FROM Users WHERE user_id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = User;
