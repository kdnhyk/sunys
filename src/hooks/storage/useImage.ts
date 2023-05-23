import { storage } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type IsTransaction = "logo" | "store" | "collection" | "article";

export const useImage = (transaction: IsTransaction) => {
  const upload = async (file: File | null, name: string, setImageURL: any) => {
    if (!file) return;
    const newName = name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");
    // 오류 던지는 방향으로? -> 특수문자 제거하라고 => 그러면 또 불편하긴 함
    console.log(transaction, name);
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
