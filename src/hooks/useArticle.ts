import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useArticleStore } from "./firestore/useArticleStore";
import { articleSelector } from "../store/article";

export const useArticle = () => {
  const [articleList, setArticleList] = useRecoilState(articleSelector);

  const {
    documents,
    getAllDocuments,
    getArticleByIdRealTime,
    getArticleByCidRealtime,
    deleteArticle,
  } = useArticleStore();

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

  const handleArticleByCid = async (cid: string) => {
    getArticleByCidRealtime(cid);
  };

  return {
    articleList,
    handleArticleByCid,
  };
};
