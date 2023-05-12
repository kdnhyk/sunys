import { storage } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type IsTransaction = "logo" | "store" | "collection" | "article";

export const useImage = (transaction: IsTransaction) => {
  const upload = async (file: any, name: string, setImageURL: any) => {
    if (!file) return;
    const newName = name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");
    // 오류 던지는 방향으로? -> 특수문자 제거하라고 => 그러면 또 불편하긴 함
    const storageRef = ref(storage, `${transaction}/${newName}`);

    if (file === null) {
      console.log("File is not found");
      return;
    }

    await uploadBytes(storageRef, file).catch((e) => {
      console.log(e);
    });

    await getDownloadURL(storageRef).then(async (url) => {
      await setImageURL(url);
    });
  };

  const deleteImage = async (url: string) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef);
  };

  return { upload, deleteImage };
};
