import { getBrandList } from "@/api/brandList/useBrandList";
import { IsBrandName } from "@/types/brand";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async () => {
  const brandList = await getBrandList();
  const sitemapFields = brandList.map((brandName: IsBrandName) => ({
    loc: `https://sunys.co.kr/brand/${brandName.default}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  }));

  const sitemap = getServerSideSitemap(sitemapFields);

  return {
    props: {
      sitemap,
    },
  };
};

const SiteMap = () => null;

export default SiteMap;
