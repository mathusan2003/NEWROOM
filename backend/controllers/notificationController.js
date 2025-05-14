// controllers/notificationController.js
const mongoose = require('mongoose');
const Notification = require('../models/Notification'); // Ensure it's the correct model
const sendEmail = require('../utils/emailService');
const mailTemplate = require('../views/mailTemplate');

const sendNotification = async (req, res) => {
  try {
    const { roomNo, name, email, guests, checkInDate, periodOfStay, message } = req.body;

    if (!roomNo || !name || !email || !guests || !checkInDate || !periodOfStay || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailSubject = 'Room Booking Notification';
    await sendEmail(email, emailSubject, mailTemplate(name, roomNo, guests, checkInDate, periodOfStay, message));

    const notification = new Notification({ roomNo, name, email, guests, checkInDate, periodOfStay, message });
    await notification.save();

    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ role: 'user' });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification', error });
  }
};

const deleteNotificationByAdmin = async (req, res) => {
  try {
    const { notificationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ message: 'Invalid notification ID format' });
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await Notification.deleteOne({ _id: notificationId });

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  sendNotification,
  getNotifications,
  deleteNotificationByAdmin,
  getNotificationById,
};
