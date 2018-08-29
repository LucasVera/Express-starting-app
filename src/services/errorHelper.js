export function sendJsonError(res, error) {
  if (typeof error !== 'string') {
    error = JSON.stringify(error, Object.getOwnPropertyNames(error));
  }
  res.status(400).send({
    success: false,
    error
  });
  res.end();
}
