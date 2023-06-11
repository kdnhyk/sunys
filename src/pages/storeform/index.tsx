import InfoArea from "@/containers/storeform/InfoArea";
import { useAuth } from "@/hooks/useAuth";
import { media } from "@/media";
import styled from "styled-components";

export default function StoreForm() {
  const { user } = useAuth();

  return (
    <StoreFormWrap>
      <div className="LeftSide">
        <InfoArea />
      </div>
      <div className="RightSide"></div>
    </StoreFormWrap>
  );
}

const StoreFormWrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .LeftSide {
    display: flex;
    flex-direction: column;
  }

  ${media.desktop`
    flex-direction: row;

    position: fixed;
    height: calc(100% - 50px);

    .LeftSide {
      position: relative;
      width: 40%;

      border-right: 1px solid var(--line-color);
    }

    .RightSide {
      width: 60%;
    }
  `}
`;
