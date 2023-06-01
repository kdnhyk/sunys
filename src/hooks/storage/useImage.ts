import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type IsTransaction = "logo" | "brandstore" | "store" | "collection" | "article";

export const useImage = (transaction: IsTransaction) => {
  const upload = async (file: File | null, name: string, setImageURL: any) => {
    if (!file) return;

    console.log(transaction, name);
    const newName = name.replaceAll(/\//g, "");

    const storageRef = ref(storage, `${transaction}/${newName}`);

    if (file === null) {
      console.log("File is not found");
      return;
    }

    await uploadBytes(storageRef, file).catch((e) => {
      console.log(e.code);
    });

    await getDownloadURL(storageRef)
      .then(async (url) => {
        console.log(url);
        await setImageURL(url);
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });

    console.log("end");
  };

  const deleteImage = async (url: string) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef);
  };

  return { upload, deleteImage };
};
