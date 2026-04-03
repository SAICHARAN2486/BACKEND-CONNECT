/**
 * Formats a successful API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {any} data - Data to send
 * @param {string} message - Success message
 */
exports.sendResponse = (res, statusCode, data, message = 'Success') => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
