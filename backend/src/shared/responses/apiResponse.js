export const successResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res, statusCode, message, status = "error") => {
    return res.status(statusCode).json({
        success: false,
        status,
        message,
    })
}