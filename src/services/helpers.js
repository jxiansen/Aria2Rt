export function validateValueRequired(value, message = "") {
  if (!value) {
    return Promise.reject({
      message,
    });
  }
  return Promise.resolve(true);
}