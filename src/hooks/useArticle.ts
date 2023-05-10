import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useArticleStore } from "./firestore/useArticleStore";
import { articleSelector } from "../store/article";

export const useArticle = () => {
  const [articleList, setArticleList] = useRecoilState(articleSelector);

  const {
    documents,
    getAllDocuments,
    getDocumentByRealTime,
    getDocumentById,
    deleteDocument,
  } = useArticleStore();

  useEffect(() => {
    if (!documents) return;
    setArticleList(documents);
  }, [documents]);

  const getArticleList = async () => {
    setArticleList(await getAllDocuments());
  };

  const getRealTimeArticles = async () => {
    getDocumentByRealTime();
  };

  const getArticleById = async (id: string) => {
    return getDocumentById(id);
  };

  const searchFilter = (userVocalList: string[], value: string) => {
    const result = userVocalList.filter((e) => {
      return e
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase().replace(" ", ""));
    });
    return result;
  };

  return {
    articleList,
    getArticleList,
    getRealTimeArticles,
    getArticleById,
    searchFilter,
  };
};
