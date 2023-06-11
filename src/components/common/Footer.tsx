import styled from "styled-components";

export default function Footer() {
  return (
    <FooterWrap>
      <p>
        All Rights Reserved By
        <a
          href="https://instagram.com/no_kwon?igshid=NTc4MTIwNjQ2YQ=="
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;@no_kwon
        </a>
      </p>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  p {
    font-size: 10px;
  }
`;
