import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IsCollection } from "@/types/collection";
import { useImage } from "@/hooks/storage/useImage";
import { IsArticle } from "@/types/article";
import useMutationArticle from "@/api/article/useMutationArticle";
import { downloadImage } from "@/util/file";

const useCrawlArticleForm = (data: IsArticle, collection: IsCollection) => {
  const [isUpload, setIsUpload] = useState(false);

  const { upload } = useImage("article");
  const { updateArticle } = useMutationArticle(collection.id || "");
  const [input, setInput] = useState<IsArticle>({
    images: [],
    articleName: data.articleName,
    description: "",
    price: data.price,
    collectionId: collection.id || "",

    brandName: collection.brandName,
  });

  const onChangeInput = async (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    await setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const setImageUrl = (url: string) => {
    setInput((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const image = await downloadImage(data.images[0]);
    console.log(image);

    await upload(
      image,
      `${input.brandName}-${input.collectionId}-${input.articleName}`,
      setImageUrl
    );
    setIsUpload(true);
  };

  useEffect(() => {
    if (isUpload) {
      updateArticle.mutate({
        id: `${input.brandName}-${input.collectionId}-${input.articleName}`,
        article: {
          ...input,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return {
    input,
    onChangeInput,
    onSubmit,
  };
};

export default useCrawlArticleForm;
