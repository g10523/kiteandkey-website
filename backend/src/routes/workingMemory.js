const express = require('express');
const router = express.Router();
const controller = require('../controllers/workingMemoryController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/status/:studentId', controller.getStatus);
router.get('/timeline/:studentId', controller.getTimeline);
router.get('/report/:attemptId', controller.getReport);

router.post('/start', controller.startAttempt);
router.post('/:attemptId/response', controller.submitResponse);
router.post('/:attemptId/complete', controller.completeAttempt);
router.post('/unlock/:studentId', controller.unlockEarly);

module.exports = router;
