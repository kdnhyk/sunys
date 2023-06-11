import { useEffect, useState } from "react";
import { useImage } from "./storage/useImage";

interface IsUseUpload {
  default: any;
}

const useUpload = ({}: IsUseUpload) => {
  // const { updateCollection, addCollection } = useMutationCollection();
  // const { upload, deleteImage } = useImage("collection");
  // const { deleteCollection } = useMutationCollection();
  // const { onClickCollection, onClickBrandSetting } = useLocationState();
  // const [logoFile, setLogoFile] = useState<File | null>(null);
  // const [isUpload, setIsUpload] = useState(false);
  // const [isEnterButtonOn, setIsEnterButtonOn] = useState(
  //   lastCollection ? true : false
  // );
  // const [input, setInput] = useState<IsCollection>(
  //   lastCollection || { ...initCollection, brandName }
  // );
  // const setImageUrl = useCallback(async (url: string) => {
  //   await setInput((prev) => {
  //     return { ...prev, images: [url] };
  //   });
  // }, []);
  // const setImageFile = useCallback(async (file: File | null) => {
  //   await setLogoFile(file);
  // }, []);
  // const onChange = useCallback(
  //   async (
  //     e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     await setInput((prev) => {
  //       return { ...prev, [name]: value };
  //     });
  //   },
  //   []
  // );
  // const onChangeInputIsVisible = useCallback(async () => {
  //   await setInput((prev) => {
  //     return { ...prev, isVisible: !prev.isVisible };
  //   });
  // }, []);
  // const onSubmit = async () => {
  //   if (!isEnterButtonOn) return;
  //   await upload(
  //     logoFile,
  //     `${input.brandName}_${input.collectionName}_${input.releaseDate}`,
  //     setImageUrl
  //   );
  //   setIsUpload(true);
  // };
  // const onDeleteCollection = () => {
  //   if (!lastCollection?.id) {
  //     alert("생성중엔 삭제할 수 없습니다");
  //     return;
  //   }
  //   if (articleList.length > 0) {
  //     alert("상품 먼저 삭제 해야합니다");
  //     return;
  //   }
  //   deleteCollection.mutate({
  //     id: lastCollection.id,
  //     imageUrl: lastCollection.images[0],
  //   });
  //   onClickBrandSetting(brandName);
  // };
  // // Check Confirm Button
  // useEffect(() => {
  //   if (
  //     input.collectionName &&
  //     input.releaseDate &&
  //     toCheckDateFormmat(input.releaseDate) &&
  //     (input.images[0] || logoFile)
  //   ) {
  //     setIsEnterButtonOn(() => true);
  //   } else {
  //     setIsEnterButtonOn(() => false);
  //   }
  // }, [input, logoFile]);
  // // Update & Upload
  // useEffect(() => {
  //   if (isUpload) {
  //     if (lastCollection) {
  //       updateCollection.mutate({
  //         id: lastCollection.id || "",
  //         collection: input,
  //       });
  //       if (lastCollection.images[0] !== input.images[0]) {
  //         console.log("Delete last image");
  //         deleteImage(lastCollection.images[0]);
  //       }
  //       onClickCollection(brandName, lastCollection.id || "");
  //     } else if (!lastCollection) {
  //       addCollection.mutate(input);
  //       onClickBrandSetting(brandName);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isUpload]);
};

export default useUpload;
