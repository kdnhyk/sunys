import styled from "styled-components";
import { media } from "@/media";
import InfoArea from "@/containers/brandform/InfoArea";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

//
export default function BrandForm() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user.admin) {
      router.push("/login"); // 로그인 페이지로 리다이렉션
    }
  }, [router, user.admin]);

  return (
    <BrandWrap>
      <div className="InfoWrap">
        <InfoArea />
      </div>
    </BrandWrap>
  );
}

const BrandWrap = styled.div`
  display: flex;
  flex-direction: column;
  ${media.desktop`
    flex-direction: row;
    .InfoWrap {
      width: 220px;
      flex-grow: 2;
      border-right: 1px solid #dddddd;
      .SaleWrap {
      }
    }
    .CollectionWrap {
      width: 173.5px;
      flex-grow: 4;
    }
  `}
`;
