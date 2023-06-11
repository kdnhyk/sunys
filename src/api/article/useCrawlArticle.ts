import { useQuery } from "@tanstack/react-query";
import { IsArticle } from "@/types/article";
import axios from "axios";

export const getCrawlArticle = async (brandName: string) => {
  return await (
    await axios.get(`/api/crawl/${brandName}`)
  ).data;
};

const useCrawlArticle = (brandName: string) => {
  const { data } = useQuery<IsArticle[]>(
    ["crawlArticle", brandName],
    async () => await getCrawlArticle(brandName),
    {
      enabled: !!brandName,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};

export default useCrawlArticle;
