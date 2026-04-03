const fs = require('fs');
let results = '';
try {
    require('jsonwebtoken');
    results += 'JWT OK\n';
    require('bcryptjs');
    results += 'Bcrypt OK\n';
    require('openai');
    results += 'OpenAI OK\n';
} catch (error) {
    results += 'Error: ' + error.message + '\n';
}
fs.writeFileSync('test_results.txt', results);
