const express = require('express');
const router = express.Router();
const fcmController = require('../controllers/fcmController');
const { authorizeUser, authorizeVendor, authorizeSeller } = require('../middleware/auth');

/**
 * FCM Token Routes
 * 
 * Routes for managing Firebase Cloud Messaging tokens
 * Supports User, Vendor, and Seller authentication
 */

// Unified authentication middleware that works for all user types
const authenticate = (req, res, next) => {
    // Try to authenticate as User first
    authorizeUser(req, res, (err) => {
        if (!err && req.user) {
            req.user.userType = 'user';
            req.user.userId = req.user.userId || req.user.id;
            return next();
        }

        // Try Vendor
        authorizeVendor(req, res, (err) => {
            if (!err && req.user) {
                req.user.userType = 'vendor';
                req.user.userId = req.user.vendorId || req.user.userId || req.user.id;
                return next();
            }

            // Try Seller
            authorizeSeller(req, res, (err) => {
                if (!err && req.user) {
                    req.user.userType = 'seller';
                    req.user.userId = req.user.sellerId || req.user.userId || req.user.id;
                    return next();
                }

                // All authentication methods failed
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required',
                });
            });
        });
    });
};

/**
 * @route   POST /api/fcm/register
 * @desc    Register FCM token for push notifications
 * @access  Private (User, Vendor, or Seller)
 * @body    { token: string, platform: 'web' | 'app' }
 */
router.post('/register', authenticate, fcmController.registerFCMToken);

/**
 * @route   POST /api/fcm/remove
 * @desc    Remove FCM token
 * @access  Private (User, Vendor, or Seller)
 * @body    { platform: 'web' | 'app' }
 */
router.post('/remove', authenticate, fcmController.removeFCMToken);

/**
 * @route   GET /api/fcm/status
 * @desc    Get FCM token registration status
 * @access  Private (User, Vendor, or Seller)
 */
router.get('/status', authenticate, fcmController.getFCMTokenStatus);

module.exports = router;
