const sendError = (
  res,
  status = 500,
  message = "Something went wrong",
  error = null
) => {
  const response = { message };
  if (error) response.error = error;
  return res.status(status).json(response);
};

module.exports = sendError;
