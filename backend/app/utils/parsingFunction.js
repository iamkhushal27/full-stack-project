const { BadRequestError } = require("../utils/error");

const parsePositiveInt = (value, fieldName) => {
  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new BadRequestError(`Invalid ${fieldName} value`);
  }
  return parsedValue;
};

const parseOptionalRelationId = (value, fieldName) => {
  if (value === undefined) return undefined;
  if (value === null || String(value).trim() === "") return null;
  return parsePositiveInt(value, fieldName);
};

const parseDateOnly = (date) => {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
    return date.trim();
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new BadRequestError("Invalid date");
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

module.exports = { parsePositiveInt, parseOptionalRelationId, parseDateOnly };
