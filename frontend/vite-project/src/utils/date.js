export const formatDateOnly = (date = new Date()) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return formatDateOnly(new Date());
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseDateOnlyToLocalDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") return new Date();

  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return new Date();

  return new Date(year, month - 1, day);
};
