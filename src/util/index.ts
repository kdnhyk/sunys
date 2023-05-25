import { IsBrandName } from "@/types/brand";

const toStringByFormatting = (source: any, delimiter = "-") => {
  const year = source.getFullYear();
  const month = source.getMonth() + 1;
  const day = source.getDate();

  return [
    year,
    month >= 10 ? month : `0${month}`,
    day >= 10 ? day : `0${day}`,
  ].join(delimiter);
};

const toSortBrandList = (brandList: IsBrandName[]) => {
  const result = [...brandList];

  return result.sort((a, b) => {
    if (a.default.toUpperCase() < b.default.toUpperCase()) {
      return -1;
    }
    if (a.default.toUpperCase() > b.default.toUpperCase()) {
      return 1;
    }

    return 0;
  });
};

const toSortRestBrandList = (
  brandList: IsBrandName[],
  notBrandList: IsBrandName[]
) => {
  const scrapList = [...notBrandList].map((e) => e.default);

  return toSortBrandList(
    brandList.filter((e) => !scrapList.includes(e.default))
  );
};

const toCheckDateFormmat = (input: string) => {
  const reg = /[0-9]{8}$/;
  if (reg.test(input)) {
    return true;
  }
  return false;
};

export {
  toStringByFormatting,
  toSortBrandList,
  toSortRestBrandList,
  toCheckDateFormmat,
};
