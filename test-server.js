require('dotenv').config();
const express = require('express');

console.log('Starting test server...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Test server is running!');
});

app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});
