export const validateInput = (name: string, value: string, filters: any) => {
  // Валидация для поля year
  if (name === "year") {
    return /^\d{0,4}$/.test(value);
  }

  // Валидация для поля country
  if (name === "country") {
    return /^[A-ZА-Я][a-zа-я]*$/i.test(value);
  }

  // Валидация для полей возрастного рейтинга
  if (name === "ageRatingFrom" || name === "ageRatingTo") {
    if (!/^(1[0-8]|[1-9])?$/.test(value)) return false;
    if (
      name === "ageRatingFrom" &&
      parseInt(value) > parseInt(filters.ageRatingTo)
    )
      return false;
    if (
      name === "ageRatingTo" &&
      parseInt(value) < parseInt(filters.ageRatingFrom)
    )
      return false;
  }

  return true;
};
