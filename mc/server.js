const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const user = users.find(u => u.username === username);

        if (user && await bcrypt.compare(password, user.passwordHash)) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});