import axios from "axios";
import imageCompression from "browser-image-compression";

const downloadImage = async (url: string): Promise<Blob> => {
  try {
    const response = await axios.get(
      `/api/downloadImage?url=${encodeURIComponent(url)}`,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to download image");
  }
};

const handleImage = async (file: File) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const newFile = await imageCompression(file, options);
  const result = new File([newFile], file.name.split(".")[0] + ".webp", {
    type: "image/webp",
    lastModified: new Date().getTime(),
  });

  return result;
};

export { downloadImage, handleImage };
