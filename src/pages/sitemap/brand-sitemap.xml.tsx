import { getBrandList } from "@/api/useBrandList";
import { IsBrandName } from "@/types/brand";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps = async (context: ISitemapField[]) => {
  const brandList = await getBrandList();
  const sitemapFields: ISitemapField[] = brandList.map(
    (brandName: IsBrandName) => {
      return {
        loc: `https://sunys.co.kr/brand/${brandName.default}`, // 페이지 경로
        lastmod: new Date().toISOString(), // 최근변경일자
        changefreq: "daily", // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
        priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
      };
    }
  );

  return getServerSideSitemap(context, sitemapFields);
};
