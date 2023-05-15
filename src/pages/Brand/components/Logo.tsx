import styled from "styled-components";

interface IsStoreStyle {
  logo: string;
  officialUrl: string;
}

export default function Logo({ logo, officialUrl }: IsStoreStyle) {
  return (
    <LogoWrap>
      <div className="ImageWrap">
        <img src={logo} alt="" width={160} height={160} />
      </div>
    </LogoWrap>
  );
}

const LogoWrap = styled.div`
  position: relative;

  .ImageWrap {
    width: 160px;
    height: 160px;
    img {
      object-fit: contain;
    }
  }
`;
