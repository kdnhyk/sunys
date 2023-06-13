import styled from "styled-components";
import MainArea from "@/containers/collectionform/MainArea";
import { useRouter } from "next/router";
import useCheckAdmin from "@/hooks/useCheckAdmin";

export default function CollectionForm() {
  const { id } = useRouter().query;

  useCheckAdmin();

  if (!id) {
    return <></>;
  }

  return (
    <CollectionFormWrap>
      <MainArea brandName={typeof id === "string" ? id : ""} />
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
