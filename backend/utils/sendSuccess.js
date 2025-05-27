const sendSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  payload = {}
) => {
  return res.status(statusCode).json({
    message,
    ...payload,
  });
};

module.exports = sendSuccess;
