import styled from "styled-components";

export default function Footer() {
  return (
    <FooterWrap>
      <div className="Bottom">
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
      </div>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  .Bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 70px;
    p {
      font-size: 10px;
    }
  }
`;
