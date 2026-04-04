const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testAIAnalysis() {
    try {
        // Create a simple test file
        const form = new FormData();
        form.append('resume', Buffer.from('test resume content'), {
            filename: 'test.pdf',
            contentType: 'application/pdf'
        });

        const response = await axios.post('https://backend-connect-5.onrender.com/api/ai/analyze-resume', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('✅ AI Analysis Success:', response.data);
    } catch (error) {
        console.error('❌ AI Analysis Failed:', error.response?.data || error.message);
    }
}

testAIAnalysis();
