// 404 - ruta ne postoji
const notFound = (req, res, next) => {
  const error = new Error(`Ruta nije pronađena - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Generalni error handler - vraća JSON umesto HTML stranice sa greškom
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let poruka = err.message;

  // Mongoose "loš ObjectId" greška
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    poruka = 'Resurs nije pronađen.';
  }

  res.status(statusCode).json({
    poruka,
    stek: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
