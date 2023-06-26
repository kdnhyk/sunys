import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { IsBrand } from "@/types/brand";

export const getBrandByBrandName = async (brandName: string) => {
  const q = query(
    collection(store, "brand"),
    where("brandName", "==", brandName),
    limit(1)
  );

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result[0];
};

const useBrandByBrandName = (brandName: string) => {
  const { data:brand, refetch } = useQuery<IsBrand>(
    ["brand", brandName],
    async () => await getBrandByBrandName(brandName),
    {
      enabled: !!brandName,
    }
  );

  return { brand,refetch };
};

export default useBrandByBrandName;
