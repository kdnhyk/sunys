import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

// 고민중
const getBrandByBrandNameList = async (brandNameList: string[]) => {
  const q = query(
    collection(store, "brand"),
    where("brandName", "in", brandNameList),
    limit(6)
  );

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result[0];
};

const useUserBrand = (brandNameList: string[]) => {
  const { data } = useQuery(
    ["userBrand"],
    async () => await getBrandByBrandNameList(brandNameList),
    {
      enabled: !!brandNameList,
    }
  );

  return { data };
};

export default useUserBrand;
