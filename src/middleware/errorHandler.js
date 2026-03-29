function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    status: err.status || "error",
    message: err.message,
  });
}
export default globalErrorHandler;
