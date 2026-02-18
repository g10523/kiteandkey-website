const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// All routes require authentication
router.use(authenticate);

// Create assessment (tutors + admins)
router.post('/',
    authorize('tutor', 'admin'),
    validate(schemas.saveAssessment),
    assessmentController.createAssessment
);

// Get assessments (filtered by role)
router.get('/', assessmentController.getAssessments);

// Get single assessment
router.get('/:id', assessmentController.getAssessment);

module.exports = router;
