import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { url } = req.query;
  try {
    const response = await axios.get(url as string, {
      responseType: "arraybuffer",
    });
    const data = Buffer.from(response.data, "binary");
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent(url as string)}`
    );
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download image" });
  }
}
