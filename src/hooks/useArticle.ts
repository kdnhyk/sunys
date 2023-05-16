import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useArticleStore } from "./firestore/useArticleStore";
import { articleSelector } from "../store/article";

export const useArticle = () => {
  const [articleList, setArticleList] = useRecoilState(articleSelector);

  const { documents, getArticleByCid, getArticleByCidRealtime } =
    useArticleStore();

  useEffect(() => {
    if (!documents) return;
    setArticleList(documents);
  }, [documents]);

  // const getArticleList = async () => {
  //   setArticleList(await getAllDocuments());
  // };

  // const getRealTimeArticles = async () => {
  //   getArticleByIdRealTime();
  // };

  // Collection
  const handleArticleByCid = async (cid: string) => {
    setArticleList(await getArticleByCid(cid));
  };

  const handleArticleByCidRealtime = async (cid: string) => {
    getArticleByCidRealtime(cid);
  };

  return {
    articleList,
    handleArticleByCid,
    handleArticleByCidRealtime,
  };
};
