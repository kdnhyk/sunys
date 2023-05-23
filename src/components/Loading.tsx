import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingWrap>
      <span className="Dot1"></span>
      <span className="Dot2"></span>
      <span className="Dot3"></span>
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
    animation: loading 1s linear infinite;
  }
  .Dot1 {
    animation-delay: 0s;
  }

  .Dot2 {
    animation-delay: 0.2s;
    margin: 0px 10px;
  }

  .Dot3 {
    animation-delay: 0.4s;
  }
  @keyframes loading {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;
