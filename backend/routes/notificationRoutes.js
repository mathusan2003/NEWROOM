// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  deleteNotificationByAdmin,
  getNotificationById
} = require('../controllers/notificationController');

router.post('/send', sendNotification);
router.get('/', getNotifications);
router.delete('/:notificationId', deleteNotificationByAdmin);
router.get('/:id', getNotificationById);

module.exports = router;
