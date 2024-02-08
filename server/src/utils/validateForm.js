const validateForm = async (schema, reqBody) => {
  try {
    schema.parse(reqBody);
  } catch (error) {
    error.validationError = true;
    throw new Error(error.errors.map((err) => err.message));
  }
};

module.exports = validateForm;
