require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Import security middleware
const {
    sanitiseRequestBody,
    extraSecurityHeaders,
    validateContentType,
    auditAuthRequests
} = require('./middleware/security');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const assessmentRoutes = require('./routes/assessments');
const mindprintRoutes = require('./routes/mindprint');
const studentRoutes = require('./routes/students');
const quizRoutes = require('./routes/quizzes');
const contentRoutes = require('./routes/content');
const workingMemoryRoutes = require('./routes/workingMemory');
const scheduleRoutes = require('./routes/schedule');
const courseRoutes = require('./routes/courseRoutes');
const gradingRoutes = require('./routes/grading');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════
//  SECURITY LAYER 1: Core HTTP Security
// ═══════════════════════════════════════
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'", ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:5173', 'https://kite-academy-lms.vercel.app'])],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false, // Allow loading from frontend
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// Extra security headers (beyond helmet)
app.use(extraSecurityHeaders);

// CORS — locked to frontend origin
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:5173', 'https://kite-academy-lms.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// ═══════════════════════════════════════
//  SECURITY LAYER 2: Rate Limiting
// ═══════════════════════════════════════
const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
    message: { error: 'Too many requests from this IP, please try again later' },
    standardHeaders: true,
    legacyHeaders: false
});
app.use(globalLimiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 50,
    message: { error: 'Too many authentication attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false
});

// ═══════════════════════════════════════
//  SECURITY LAYER 3: Request Processing
// ═══════════════════════════════════════
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Content-Type validation
app.use(validateContentType);

// Sanitise request bodies (strip control chars)
app.use(sanitiseRequestBody);

// Audit auth-related requests
app.use(auditAuthRequests);

// Request logging (development only)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        const sanitisedBody = { ...req.body };
        // Never log passwords or security keys
        if (sanitisedBody.password) sanitisedBody.password = '***REDACTED***';
        if (sanitisedBody.securityKey) sanitisedBody.securityKey = '***REDACTED***';
        if (sanitisedBody.token) sanitisedBody.token = '***REDACTED***';

        console.log(`${req.method} ${req.path}`, {
            body: sanitisedBody,
            query: req.query
        });
        next();
    });
}

// ═══════════════════════════════════════
//  HEALTH CHECK (unauthenticated)
// ═══════════════════════════════════════
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        security: {
            helmet: true,
            cors: true,
            rateLimiting: true,
            securityKeys: true,
            bruteForceProtection: true,
            auditLogging: true
        }
    });
});

// ═══════════════════════════════════════
//  API ROUTES
// ═══════════════════════════════════════
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/content', contentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/mindprint', mindprintRoutes);
app.use('/api/mindprint/working-memory', workingMemoryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grading', gradingRoutes);

// ═══════════════════════════════════════
//  ERROR HANDLING
// ═══════════════════════════════════════

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler — never leak stack traces in production
app.use((err, req, res, next) => {
    console.error('Server error:', err);

    // Don't leak internal errors to clients
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(err.status || 500).json({
        error: isProduction ? 'Internal server error' : err.message,
        ...(isProduction ? {} : { stack: err.stack })
    });
});

// ═══════════════════════════════════════
//  START SERVER
// ═══════════════════════════════════════
app.listen(PORT, () => {
    console.log(`Kite & Key API server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

module.exports = app;
