const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

// In-memory data storage (replace with a DB later)
let userData = {};

// Routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/welcome.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Simple login check (replace with real authentication)
    if (username === 'user' && password === 'password') {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/data');
    } else {
        res.send('Invalid credentials. Please try again.');
    }
});

app.get('/data', (req, res) => {
    if (req.session.loggedIn) {
        res.send(`
            <h2>Welcome ${req.session.username}!</h2>
            <form method="POST" action="/save-data">
                <input type="text" name="data" placeholder="Enter some data" required />
                <button type="submit">Save Data</button>
            </form>
            <br>
            <h3>Your Data:</h3>
            <pre>${JSON.stringify(userData[req.session.username], null, 2)}</pre>
            <br>
            <a href="/">Logout</a>
        `);
    } else {
        res.redirect('/');
    }
});

app.post('/save-data', (req, res) => {
    const { data } = req.body;
    
    if (req.session.loggedIn) {
        if (!userData[req.session.username]) {
            userData[req.session.username] = [];
        }
        userData[req.session.username].push(data);
        res.redirect('/data');
    } else {
        res.redirect('/');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
