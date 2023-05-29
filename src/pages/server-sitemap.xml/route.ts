import { getBrandList } from "@/api/useBrandList";
import { IsBrandName } from "@/types/brand";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const GET = async () => {
  const brandList = await getBrandList();
  const sitemapFields: ISitemapField[] = brandList.map(
    (brandName: IsBrandName) => {
      return {
        loc: `https://sunys.co.kr/brand/${brandName.default}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 1,
      };
    }
  );
  return getServerSideSitemap(sitemapFields);
};

export default function SiteMap() {}
