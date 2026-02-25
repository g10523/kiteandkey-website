const express = require('express');
const {
    sanitiseRequestBody,
    extraSecurityHeaders,
    validateContentType,
    auditAuthRequests
} = require('./src/middleware/security');

const app = express();

app.use((req, res, next) => { console.log('Top'); next(); });

// app.use(extraSecurityHeaders);
// app.use(validateContentType);
// app.use(sanitiseRequestBody);
// app.use(auditAuthRequests);

app.get('/api/health', (req, res) => {
    console.log('In health');
    res.json({ status: 'ok' });
});

app.listen(3001, () => {
    console.log('Test server on 3001');
});
