//urlnotfound error
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

//error handler

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    stack: err?.stack,
    message: err?.message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
