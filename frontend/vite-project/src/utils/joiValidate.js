export function getJoiFormErrors(schema, values) {
  const { error } = schema.validate(values, {
    abortEarly: false,
  });

  if (!error) {
    return {};
  }

  return error.details.reduce((acc, detail) => {
    const path = detail.path.join(".");
    if (path && !acc[path]) {
      acc[path] = detail.message;
    }
    return acc;
  }, {});
}
