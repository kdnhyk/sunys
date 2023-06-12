import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface IsBrandCrawl {
  url: string;
  selector: string;
}

const brandCrawlList: { [brandName: string]: IsBrandCrawl } = {
  Stussy: {
    url: "https://kr.stussy.com/collections/new-arrivals",
    selector: "li",
  },
  "Matin Kim": {
    url: "https://matinkim.com/product/list.html?cate_no=45",
    selector: "li",
  },
  Amomento: {
    url: "https://amomento.co/product/list.html?cate_no=42",
    selector: "li",
  },
};

let a = brandCrawlList.stussy;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { brandName } = req.query;
  console.log(brandName);

  if (typeof brandName !== "string") {
    res.status(500).json({ error: "BrandName type error" });
    return;
  }

  if (!Object.keys(brandCrawlList).includes(brandName)) {
    res.send([]);
  }

  try {
    const response = await axios.get(process.env.BASE_CRAWL_URL || "", {
      params: {
        ...brandCrawlList[brandName],
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
