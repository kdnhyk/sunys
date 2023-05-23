export const toStringByFormatting = (source: any, delimiter = "-") => {
  const year = source.getFullYear();
  const month = source.getMonth() + 1;
  const day = source.getDate();

  return [
    year,
    month >= 10 ? month : `0${month}`,
    day >= 10 ? day : `0${day}`,
  ].join(delimiter);
};
