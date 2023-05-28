import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

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

const useBrand = (brandName: string) => {
  const { data } = useQuery(
    ["brand", brandName],
    async () => await getBrandByBrandName(brandName),
    {
      enabled: !!brandName,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};

export default useBrand;
