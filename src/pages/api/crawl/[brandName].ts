import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { brandName } = req.query;
  console.log(process.env.BASE_CRAWL_URL);

  try {
    const response = await axios.get(process.env.BASE_CRAWL_URL || "", {
      params: {
        url: "https://kr.stussy.com/collections/new-arrivals",
        selector: "li",
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
