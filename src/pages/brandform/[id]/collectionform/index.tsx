import styled from "styled-components";
import MainArea from "@/components/collectionform/MainArea";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function CollectionForm() {
  const { id } = useRouter().query;

  if (!id) {
    return <Loading />;
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
