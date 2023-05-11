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
    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");
    const storageRef = ref(storage, `${transaction}/${name}`);

    if (file === null) {
      console.log("File is not found");
      return;
    }

    await uploadBytes(storageRef, file).catch((e) => {
      console.log(e);
    });

    await getDownloadURL(storageRef).then(async (url) => {
      console.log(url);
      await setImageURL(url);
    });
  };

  const deleteImage = async (url: string) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef);
  };

  return { upload, deleteImage };
};
