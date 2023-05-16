import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "../media";

export default function LogoArea() {
  return (
    <LogoAreaWrap>
      <div className="LogoArea">
        <Link to={"/"}>
          <svg
            width="395"
            height="80"
            viewBox="0 0 395 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.24 79.728C28.776 79.728 24.492 79.404 20.388 78.756C16.284 78.108 12.54 77.208 9.156 76.056C5.844 74.832 2.964 73.5 0.516 72.06L10.344 53.268C13.152 54.852 15.96 56.184 18.768 57.264C21.648 58.272 24.492 59.028 27.3 59.532C30.18 60.036 33.024 60.288 35.832 60.288C38.064 60.288 39.9 60.108 41.34 59.748C42.852 59.388 43.968 58.884 44.688 58.236C45.48 57.516 45.876 56.724 45.876 55.86C45.876 54.708 45.228 53.772 43.932 53.052C42.636 52.332 40.908 51.684 38.748 51.108C36.66 50.532 34.32 49.956 31.728 49.38C29.208 48.732 26.652 47.94 24.06 47.004C21.468 45.996 19.092 44.736 16.932 43.224C14.844 41.712 13.152 39.804 11.856 37.5C10.56 35.196 9.912 32.388 9.912 29.076C9.912 23.316 11.424 18.312 14.448 14.064C17.544 9.816 21.936 6.54 27.624 4.236C33.384 1.86 40.224 0.671998 48.144 0.671998C53.76 0.671998 58.98 1.248 63.804 2.39999C68.7 3.47999 72.912 5.06399 76.44 7.152L67.26 25.728C64.236 23.856 60.924 22.452 57.324 21.516C53.796 20.58 50.196 20.112 46.524 20.112C44.076 20.112 42.024 20.364 40.368 20.868C38.712 21.3 37.452 21.912 36.588 22.704C35.796 23.496 35.4 24.324 35.4 25.188C35.4 26.34 36.048 27.312 37.344 28.104C38.64 28.824 40.368 29.472 42.528 30.048C44.688 30.552 47.028 31.128 49.548 31.776C52.14 32.352 54.696 33.108 57.216 34.044C59.808 34.908 62.184 36.096 64.344 37.608C66.504 39.048 68.232 40.92 69.528 43.224C70.824 45.456 71.472 48.228 71.472 51.54C71.472 57.156 69.924 62.088 66.828 66.336C63.732 70.512 59.304 73.788 53.544 76.164C47.856 78.54 41.088 79.728 33.24 79.728ZM112.32 79.728C104.472 79.728 97.9205 78.252 92.6645 75.3C87.4085 72.276 83.6645 68.1 81.4325 62.772C79.2725 57.372 78.9125 51.108 80.3525 43.98L88.6685 2.39999H114.156L105.948 43.548C105.444 46.212 105.264 48.516 105.408 50.46C105.552 52.404 106.02 54.024 106.812 55.32C107.676 56.616 108.828 57.588 110.268 58.236C111.708 58.812 113.436 59.1 115.452 59.1C117.9 59.1 119.988 58.596 121.716 57.588C123.516 56.58 124.992 54.924 126.144 52.62C127.368 50.316 128.34 47.292 129.06 43.548L137.268 2.39999H162.324L153.792 45.06C151.56 56.364 146.988 64.968 140.076 70.872C133.164 76.776 123.912 79.728 112.32 79.728ZM158.888 78L174.008 2.39999H194.96L223.364 48.408H214.508L223.688 2.39999H248.528L233.408 78H212.456L184.052 31.992H192.908L183.728 78H158.888ZM265.129 78L271.717 44.844L274.525 60.072L251.737 2.39999H277.333L292.885 42.036H276.793L308.653 2.39999H334.249L288.565 60.072L297.205 44.844L290.617 78H265.129ZM350.806 79.728C346.342 79.728 342.058 79.404 337.954 78.756C333.85 78.108 330.106 77.208 326.722 76.056C323.41 74.832 320.53 73.5 318.082 72.06L327.91 53.268C330.718 54.852 333.526 56.184 336.334 57.264C339.214 58.272 342.058 59.028 344.866 59.532C347.746 60.036 350.59 60.288 353.398 60.288C355.63 60.288 357.466 60.108 358.906 59.748C360.418 59.388 361.534 58.884 362.254 58.236C363.046 57.516 363.442 56.724 363.442 55.86C363.442 54.708 362.794 53.772 361.498 53.052C360.202 52.332 358.474 51.684 356.314 51.108C354.226 50.532 351.886 49.956 349.294 49.38C346.774 48.732 344.218 47.94 341.626 47.004C339.034 45.996 336.658 44.736 334.498 43.224C332.41 41.712 330.718 39.804 329.422 37.5C328.126 35.196 327.478 32.388 327.478 29.076C327.478 23.316 328.99 18.312 332.014 14.064C335.11 9.816 339.502 6.54 345.19 4.236C350.95 1.86 357.79 0.671998 365.71 0.671998C371.326 0.671998 376.546 1.248 381.37 2.39999C386.266 3.47999 390.478 5.06399 394.006 7.152L384.826 25.728C381.802 23.856 378.49 22.452 374.89 21.516C371.362 20.58 367.762 20.112 364.09 20.112C361.642 20.112 359.59 20.364 357.934 20.868C356.278 21.3 355.018 21.912 354.154 22.704C353.362 23.496 352.966 24.324 352.966 25.188C352.966 26.34 353.614 27.312 354.91 28.104C356.206 28.824 357.934 29.472 360.094 30.048C362.254 30.552 364.594 31.128 367.114 31.776C369.706 32.352 372.262 33.108 374.782 34.044C377.374 34.908 379.75 36.096 381.91 37.608C384.07 39.048 385.798 40.92 387.094 43.224C388.39 45.456 389.038 48.228 389.038 51.54C389.038 57.156 387.49 62.088 384.394 66.336C381.298 70.512 376.87 73.788 371.11 76.164C365.422 78.54 358.654 79.728 350.806 79.728Z"
              fill="#314AF3"
            />
          </svg>
        </Link>
      </div>
    </LogoAreaWrap>
  );
}

const LogoAreaWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: #314af3;
  z-index: 100;

  .LogoArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 100;

    cursor: pointer;
    a {
      svg {
        width: 100%;
        height: auto;
      }
    }

    ${media.desktop`
    width: 220px;
    height: 48px;
    padding: 9px 0px;
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
      a{
        svg {
          height: 28px;
          width: auto;
        }
      }
    `}
  }
`;
