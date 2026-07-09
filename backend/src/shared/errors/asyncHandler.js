/**
 * asyncHandler.js
 * 
 * Utility function to wrap async controller functions
 * 
 * @module asyncHandler
*/

const asyncHandler = (fn) => async (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;