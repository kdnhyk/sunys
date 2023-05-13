import styled from "styled-components";

interface IsStoreStyle {
  logo: string;
  officialUrl: string;
}

export default function Logo({ logo, officialUrl }: IsStoreStyle) {
  return (
    <LogoWrap>
      <div className="ImageWrap">
        <img src={logo} alt="" />
      </div>

      <div className="HoverWrap">
        <div className="Background"></div>

        <a href={officialUrl} target="_blank" rel="noreferrer">
          <p>{officialUrl.split("/")[2]}</p>
        </a>
      </div>
    </LogoWrap>
  );
}

const LogoWrap = styled.div`
  position: relative;
  &:hover {
    .HoverWrap {
      background-color: rgba(0, 0, 0, 0.3);
      a {
        display: block;
      }
    }
  }
  .ImageWrap {
    width: 160px;
    height: 160px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .HoverWrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all 0.1s ease-out;
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: none;
      p {
        color: white;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
      }
    }
  }
`;
