import styled from "styled-components";

export default function NotFound() {
  return (
    <NotFoundWrap>
      <h2>NOT FOUND</h2>
      <h2>NOT FOUND</h2>
      <h2>NOT FOUND</h2>
      <h2>NOT FOUND</h2>
      <p>Please back to Home</p>
    </NotFoundWrap>
  );
}

const NotFoundWrap = styled.div`
  padding: 20px;
  p {
    margin-top: 10px;
  }
`;
