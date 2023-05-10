import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useCart from "../hooks/useCart";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import HamModal from "./HamModal";

interface IsHeader {}

export default function Header({}: IsHeader) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isFixHeader, setIsFixHeader] = useState(false);
  const { cart } = useCart();
  const path = useLocation().pathname.toUpperCase().split("/")[1] || "MAIN";

  const targetRef = useRef(null);
  const handleScroll = useCallback(() => {
    // console.log("scrolling");

    // console.log(window.scrollY);
    if (window.scrollY > 96) {
      setIsFixHeader(() => true);
    } else {
      setIsFixHeader(() => false);
    }
  }, []);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 300);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [path]);

  const handleIsOpenModal = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <HeaderWrap isOpenMenu={isOpenMenu} isFixHeader={isFixHeader}>
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

      <div className="NavArea">
        <div className="LineLeft"></div>
        <div className="Menu">
          <p className="Current">{path}</p>
        </div>
        <div className="LineRight"></div>
      </div>

      <div className="HeaderArea" ref={targetRef}>
        <div className="Hambager" onClick={handleIsOpenModal}>
          {isOpenMenu ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L19 19M1 19L19 1" stroke="#314AF3" />
            </svg>
          ) : (
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H24M0 9H24M0 17H24" stroke="#314AF3" />
            </svg>
          )}
        </div>
        <div className="SmallLogo">
          {isFixHeader ? (
            <Link to={"/"}>
              <svg
                width="132"
                height="27"
                viewBox="0 0 132 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.08 26.576C9.592 26.576 8.164 26.468 6.796 26.252C5.428 26.036 4.18 25.736 3.052 25.352C1.948 24.944 0.988 24.5 0.172 24.02L3.448 17.756C4.384 18.284 5.32 18.728 6.256 19.088C7.216 19.424 8.164 19.676 9.1 19.844C10.06 20.012 11.008 20.096 11.944 20.096C12.688 20.096 13.3 20.036 13.78 19.916C14.284 19.796 14.656 19.628 14.896 19.412C15.16 19.172 15.292 18.908 15.292 18.62C15.292 18.236 15.076 17.924 14.644 17.684C14.212 17.444 13.636 17.228 12.916 17.036C12.22 16.844 11.44 16.652 10.576 16.46C9.736 16.244 8.884 15.98 8.02 15.668C7.156 15.332 6.364 14.912 5.644 14.408C4.948 13.904 4.384 13.268 3.952 12.5C3.52 11.732 3.304 10.796 3.304 9.692C3.304 7.772 3.808 6.104 4.816 4.688C5.848 3.272 7.312 2.18 9.208 1.412C11.128 0.619999 13.408 0.223999 16.048 0.223999C17.92 0.223999 19.66 0.415999 21.268 0.799998C22.9 1.16 24.304 1.688 25.48 2.384L22.42 8.576C21.412 7.952 20.308 7.484 19.108 7.172C17.932 6.86 16.732 6.704 15.508 6.704C14.692 6.704 14.008 6.788 13.456 6.956C12.904 7.1 12.484 7.304 12.196 7.568C11.932 7.832 11.8 8.108 11.8 8.396C11.8 8.78 12.016 9.104 12.448 9.368C12.88 9.608 13.456 9.824 14.176 10.016C14.896 10.184 15.676 10.376 16.516 10.592C17.38 10.784 18.232 11.036 19.072 11.348C19.936 11.636 20.728 12.032 21.448 12.536C22.168 13.016 22.744 13.64 23.176 14.408C23.608 15.152 23.824 16.076 23.824 17.18C23.824 19.052 23.308 20.696 22.276 22.112C21.244 23.504 19.768 24.596 17.848 25.388C15.952 26.18 13.696 26.576 11.08 26.576ZM37.4402 26.576C34.8242 26.576 32.6402 26.084 30.8882 25.1C29.1362 24.092 27.8882 22.7 27.1442 20.924C26.4242 19.124 26.3042 17.036 26.7842 14.66L29.5562 0.799998H38.0522L35.3162 14.516C35.1482 15.404 35.0882 16.172 35.1362 16.82C35.1842 17.468 35.3402 18.008 35.6042 18.44C35.8922 18.872 36.2762 19.196 36.7562 19.412C37.2362 19.604 37.8122 19.7 38.4842 19.7C39.3002 19.7 39.9962 19.532 40.5722 19.196C41.1722 18.86 41.6642 18.308 42.0482 17.54C42.4562 16.772 42.7802 15.764 43.0202 14.516L45.7562 0.799998H54.1082L51.2642 15.02C50.5202 18.788 48.9962 21.656 46.6922 23.624C44.3882 25.592 41.3042 26.576 37.4402 26.576ZM52.9626 26L58.0026 0.799998H64.9866L74.4546 16.136H71.5026L74.5626 0.799998H82.8426L77.8026 26H70.8186L61.3506 10.664H64.3026L61.2426 26H52.9626ZM88.3762 26L90.5722 14.948L91.5082 20.024L83.9122 0.799998H92.4442L97.6282 14.012H92.2642L102.884 0.799998H111.416L96.1882 20.024L99.0682 14.948L96.8722 26H88.3762ZM116.935 26.576C115.447 26.576 114.019 26.468 112.651 26.252C111.283 26.036 110.035 25.736 108.907 25.352C107.803 24.944 106.843 24.5 106.027 24.02L109.303 17.756C110.239 18.284 111.175 18.728 112.111 19.088C113.071 19.424 114.019 19.676 114.955 19.844C115.915 20.012 116.863 20.096 117.799 20.096C118.543 20.096 119.155 20.036 119.635 19.916C120.139 19.796 120.511 19.628 120.751 19.412C121.015 19.172 121.147 18.908 121.147 18.62C121.147 18.236 120.931 17.924 120.499 17.684C120.067 17.444 119.491 17.228 118.771 17.036C118.075 16.844 117.295 16.652 116.431 16.46C115.591 16.244 114.739 15.98 113.875 15.668C113.011 15.332 112.219 14.912 111.499 14.408C110.803 13.904 110.239 13.268 109.807 12.5C109.375 11.732 109.159 10.796 109.159 9.692C109.159 7.772 109.663 6.104 110.671 4.688C111.703 3.272 113.167 2.18 115.063 1.412C116.983 0.619999 119.263 0.223999 121.903 0.223999C123.775 0.223999 125.515 0.415999 127.123 0.799998C128.755 1.16 130.159 1.688 131.335 2.384L128.275 8.576C127.267 7.952 126.163 7.484 124.963 7.172C123.787 6.86 122.587 6.704 121.363 6.704C120.547 6.704 119.863 6.788 119.311 6.956C118.759 7.1 118.339 7.304 118.051 7.568C117.787 7.832 117.655 8.108 117.655 8.396C117.655 8.78 117.871 9.104 118.303 9.368C118.735 9.608 119.311 9.824 120.031 10.016C120.751 10.184 121.531 10.376 122.371 10.592C123.235 10.784 124.087 11.036 124.927 11.348C125.791 11.636 126.583 12.032 127.303 12.536C128.023 13.016 128.599 13.64 129.031 14.408C129.463 15.152 129.679 16.076 129.679 17.18C129.679 19.052 129.163 20.696 128.131 22.112C127.099 23.504 125.623 24.596 123.703 25.388C121.807 26.18 119.551 26.576 116.935 26.576Z"
                  fill="#314AF3"
                />
              </svg>
            </Link>
          ) : (
            <svg
              width="132"
              height="27"
              viewBox="0 0 132 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.08 26.576C9.592 26.576 8.164 26.468 6.796 26.252C5.428 26.036 4.18 25.736 3.052 25.352C1.948 24.944 0.988 24.5 0.172 24.02L3.448 17.756C4.384 18.284 5.32 18.728 6.256 19.088C7.216 19.424 8.164 19.676 9.1 19.844C10.06 20.012 11.008 20.096 11.944 20.096C12.688 20.096 13.3 20.036 13.78 19.916C14.284 19.796 14.656 19.628 14.896 19.412C15.16 19.172 15.292 18.908 15.292 18.62C15.292 18.236 15.076 17.924 14.644 17.684C14.212 17.444 13.636 17.228 12.916 17.036C12.22 16.844 11.44 16.652 10.576 16.46C9.736 16.244 8.884 15.98 8.02 15.668C7.156 15.332 6.364 14.912 5.644 14.408C4.948 13.904 4.384 13.268 3.952 12.5C3.52 11.732 3.304 10.796 3.304 9.692C3.304 7.772 3.808 6.104 4.816 4.688C5.848 3.272 7.312 2.18 9.208 1.412C11.128 0.619999 13.408 0.223999 16.048 0.223999C17.92 0.223999 19.66 0.415999 21.268 0.799998C22.9 1.16 24.304 1.688 25.48 2.384L22.42 8.576C21.412 7.952 20.308 7.484 19.108 7.172C17.932 6.86 16.732 6.704 15.508 6.704C14.692 6.704 14.008 6.788 13.456 6.956C12.904 7.1 12.484 7.304 12.196 7.568C11.932 7.832 11.8 8.108 11.8 8.396C11.8 8.78 12.016 9.104 12.448 9.368C12.88 9.608 13.456 9.824 14.176 10.016C14.896 10.184 15.676 10.376 16.516 10.592C17.38 10.784 18.232 11.036 19.072 11.348C19.936 11.636 20.728 12.032 21.448 12.536C22.168 13.016 22.744 13.64 23.176 14.408C23.608 15.152 23.824 16.076 23.824 17.18C23.824 19.052 23.308 20.696 22.276 22.112C21.244 23.504 19.768 24.596 17.848 25.388C15.952 26.18 13.696 26.576 11.08 26.576ZM37.4402 26.576C34.8242 26.576 32.6402 26.084 30.8882 25.1C29.1362 24.092 27.8882 22.7 27.1442 20.924C26.4242 19.124 26.3042 17.036 26.7842 14.66L29.5562 0.799998H38.0522L35.3162 14.516C35.1482 15.404 35.0882 16.172 35.1362 16.82C35.1842 17.468 35.3402 18.008 35.6042 18.44C35.8922 18.872 36.2762 19.196 36.7562 19.412C37.2362 19.604 37.8122 19.7 38.4842 19.7C39.3002 19.7 39.9962 19.532 40.5722 19.196C41.1722 18.86 41.6642 18.308 42.0482 17.54C42.4562 16.772 42.7802 15.764 43.0202 14.516L45.7562 0.799998H54.1082L51.2642 15.02C50.5202 18.788 48.9962 21.656 46.6922 23.624C44.3882 25.592 41.3042 26.576 37.4402 26.576ZM52.9626 26L58.0026 0.799998H64.9866L74.4546 16.136H71.5026L74.5626 0.799998H82.8426L77.8026 26H70.8186L61.3506 10.664H64.3026L61.2426 26H52.9626ZM88.3762 26L90.5722 14.948L91.5082 20.024L83.9122 0.799998H92.4442L97.6282 14.012H92.2642L102.884 0.799998H111.416L96.1882 20.024L99.0682 14.948L96.8722 26H88.3762ZM116.935 26.576C115.447 26.576 114.019 26.468 112.651 26.252C111.283 26.036 110.035 25.736 108.907 25.352C107.803 24.944 106.843 24.5 106.027 24.02L109.303 17.756C110.239 18.284 111.175 18.728 112.111 19.088C113.071 19.424 114.019 19.676 114.955 19.844C115.915 20.012 116.863 20.096 117.799 20.096C118.543 20.096 119.155 20.036 119.635 19.916C120.139 19.796 120.511 19.628 120.751 19.412C121.015 19.172 121.147 18.908 121.147 18.62C121.147 18.236 120.931 17.924 120.499 17.684C120.067 17.444 119.491 17.228 118.771 17.036C118.075 16.844 117.295 16.652 116.431 16.46C115.591 16.244 114.739 15.98 113.875 15.668C113.011 15.332 112.219 14.912 111.499 14.408C110.803 13.904 110.239 13.268 109.807 12.5C109.375 11.732 109.159 10.796 109.159 9.692C109.159 7.772 109.663 6.104 110.671 4.688C111.703 3.272 113.167 2.18 115.063 1.412C116.983 0.619999 119.263 0.223999 121.903 0.223999C123.775 0.223999 125.515 0.415999 127.123 0.799998C128.755 1.16 130.159 1.688 131.335 2.384L128.275 8.576C127.267 7.952 126.163 7.484 124.963 7.172C123.787 6.86 122.587 6.704 121.363 6.704C120.547 6.704 119.863 6.788 119.311 6.956C118.759 7.1 118.339 7.304 118.051 7.568C117.787 7.832 117.655 8.108 117.655 8.396C117.655 8.78 117.871 9.104 118.303 9.368C118.735 9.608 119.311 9.824 120.031 10.016C120.751 10.184 121.531 10.376 122.371 10.592C123.235 10.784 124.087 11.036 124.927 11.348C125.791 11.636 126.583 12.032 127.303 12.536C128.023 13.016 128.599 13.64 129.031 14.408C129.463 15.152 129.679 16.076 129.679 17.18C129.679 19.052 129.163 20.696 128.131 22.112C127.099 23.504 125.623 24.596 123.703 25.388C121.807 26.18 119.551 26.576 116.935 26.576Z"
                fill="#314AF3"
              />
            </svg>
          )}
        </div>
        <div className="Cart">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.00179 20C5.45162 20 4.98082 19.8043 4.58937 19.413C4.19725 19.021 4.00119 18.55 4.00119 18C4.00119 17.45 4.19725 16.979 4.58937 16.587C4.98082 16.1957 5.45162 16 6.00179 16C6.55195 16 7.02276 16.1957 7.41421 16.587C7.80632 16.979 8.00238 17.45 8.00238 18C8.00238 18.55 7.80632 19.021 7.41421 19.413C7.02276 19.8043 6.55195 20 6.00179 20ZM16.0048 20C15.4546 20 14.9838 19.8043 14.5923 19.413C14.2002 19.021 14.0042 18.55 14.0042 18C14.0042 17.45 14.2002 16.979 14.5923 16.587C14.9838 16.1957 15.4546 16 16.0048 16C16.5549 16 17.0261 16.1957 17.4182 16.587C17.8096 16.979 18.0054 17.45 18.0054 18C18.0054 18.55 17.8096 19.021 17.4182 19.413C17.0261 19.8043 16.5549 20 16.0048 20ZM6.00179 15C5.25156 15 4.68473 14.6707 4.30128 14.012C3.91783 13.354 3.90116 12.7 4.25127 12.05L5.60167 9.6L2.0006 2H0.97529C0.691873 2 0.45847 1.904 0.275082 1.712C0.0916939 1.52067 0 1.28333 0 1C0 0.716667 0.0960286 0.479 0.288086 0.287C0.479476 0.0956666 0.71688 0 1.0003 0H2.62578C2.80917 0 2.98422 0.0500001 3.15094 0.15C3.31765 0.25 3.44269 0.391667 3.52605 0.575L4.20125 2H18.9556C19.4058 2 19.7142 2.16667 19.8809 2.5C20.0476 2.83333 20.0393 3.18333 19.8559 3.55L16.3049 9.95C16.1215 10.2833 15.8797 10.5417 15.5796 10.725C15.2795 10.9083 14.9378 11 14.5543 11H7.10211L6.00179 13H17.0301C17.3135 13 17.5469 13.0957 17.7303 13.287C17.9137 13.479 18.0054 13.7167 18.0054 14C18.0054 14.2833 17.9093 14.5207 17.7173 14.712C17.5259 14.904 17.2885 15 17.0051 15H6.00179Z"
              fill="#314af3"
            />
          </svg>
          <span>{cart.length === 0 ? "" : cart.length}</span>
        </div>
        <div className="ModalWrap">
          {isOpenMenu && <HamModal closeModal={handleIsOpenModal} />}
        </div>
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div<{ isOpenMenu: boolean; isFixHeader: boolean }>`
  position: relative;
  height: 146px;
  display: flex;
  flex-direction: column;
  color: #314af3;
  z-index: 10;
  background-color: #eeeeee;

  /* ${({ isOpenMenu }) =>
    isOpenMenu &&
    css`
      width: 100%;
      position: sticky;
      top: 0px;
    `} */

  .LogoArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 20;
    cursor: pointer;
    a {
      svg {
        width: 100%;
        height: auto;
      }
    }
  }

  .NavArea {
    position: relative;
    display: flex;

    .LineLeft {
      margin-top: 8px;
      width: 50%;
      border-top: 1px solid #314af3;
    }
    .Menu {
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: 20;
      p {
        width: fit-content;
        padding: 0px 12px;
        text-align: center;
        cursor: pointer;
      }
      .Current {
        font-style: italic;
      }
    }

    .LineRight {
      margin-top: 8px;
      width: 50%;
      border-top: 1px solid #314af3;
    }
  }

  .HeaderArea {
    position: ${({ isFixHeader }) => (isFixHeader ? "fixed" : "absolute")};
    width: 100%;
    background-color: #eeeeee;
    z-index: 10;
    top: ${({ isFixHeader }) => (isFixHeader ? "0px" : "96px")};
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    transition: border 0.1s ease-out;
    border-bottom: ${({ isFixHeader }) =>
      isFixHeader ? "1px solid #dddddd" : "1px solid #eeeeee"};
    .Hambager {
      width: 24px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      z-index: 20;
    }
    .SmallLogo {
      transition: opacity 0.1s ease-out;
      opacity: ${({ isFixHeader }) => (isFixHeader ? "1" : "0")};
    }
    .Cart {
      position: relative;
      cursor: pointer;
      span {
        position: absolute;
        top: 0px;
        right: -7px;
        font-size: 11px;
      }
    }
  }

  .ModalWrap {
    position: absolute;
    top: 50px;
  }
`;
