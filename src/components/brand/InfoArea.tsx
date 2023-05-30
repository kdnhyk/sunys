import styled from "styled-components";
import { useAuth } from "@/hooks/useAuth";
import OfflineStore from "./OfflineStore";
import Button from "../Button";
import { IsBrand } from "@/types/brand";
import useLocationState from "@/hooks/useLocationState";
import useMutationBrand from "@/api/useMutationBrand";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import { useUser } from "@/api/useUser";
import { SettingIcon } from "@/asset/Icon";

interface IsInfoArea {
  data: IsBrand;
}

export default function InfoArea({ data: currentBrand }: IsInfoArea) {
  const { onOpenModal } = useModal();
  const { user } = useAuth();
  const { handleBrandScrap } = useUser();
  const { onClickBrandSetting } = useLocationState();
  const { updateBrand } = useMutationBrand(currentBrand.brandName);

  const isBeforeScraped = user.scrapBrandList.find(
    (e) => e.default === currentBrand.brandName
  )
    ? true
    : false;

  const onScrapBrand = async () => {
    if (!user.uid) {
      onOpenModal();
      return;
    }

    // user scrapBrandList 확인 후 isAdd 반환
    const { isAdd } = await handleBrandScrap(user, {
      default: currentBrand.brandName,
      korean: currentBrand.brandNameKo,
    });

    // 기존 user scrapBrandList와 비교하여 brand 업데이트
    // !! 다시 brand로 나갔다 올 경우 최신 데이터 반환 x !!
    updateBrand.mutate({
      id: currentBrand.brandName,
      brand: {
        ...currentBrand,
        scrapNum:
          isAdd && !isBeforeScraped
            ? currentBrand.scrapNum + 1
            : !isAdd && isBeforeScraped
            ? currentBrand.scrapNum - 1
            : currentBrand.scrapNum,
      },
    });
  };

  return (
    <InfoAreaStyle>
      <div className="OfficialButtonWrap">
        {currentBrand.officialUrl && (
          <a
            className="OfficialButtonLink"
            href={currentBrand.officialUrl}
            target="_blank"
            rel="noreferrer"
          >
            <p>공식 페이지로 이동</p>
          </a>
        )}
      </div>

      <div className="LogoWrap">
        {currentBrand.logo && (
          <Image
            src={currentBrand.logo}
            alt=""
            width={160}
            height={160}
            priority
          />
        )}
      </div>
      <div className="DescriptionWrap">
        <p>{currentBrand.description}</p>
      </div>
      <div className="TitleWrap">
        <div className="BrandName">
          <h1>{currentBrand.brandName.toUpperCase()}</h1>
        </div>
        <div className="ScrapWrap">
          <div className="ScrapNum">
            <p>{currentBrand.scrapNum}</p>
          </div>
          <div className="ButtonWrap">
            {user.scrapBrandList.find(
              (e) => e.default === currentBrand.brandName
            ) ? (
              <Button onClick={onScrapBrand}>스크랩 취소</Button>
            ) : (
              <Button onClick={onScrapBrand} isActivated={true}>
                스크랩
              </Button>
            )}
          </div>
        </div>
        {user.admin && (
          <div
            className="Setting"
            onClick={() => onClickBrandSetting(currentBrand.brandName)}
          >
            <SettingIcon />
          </div>
        )}
      </div>
      {currentBrand.saleStartDate && currentBrand.saleEndDate && (
        <div className="SaleWrap">
          <h3 className="SaleName">{currentBrand.saleName.toUpperCase()}</h3>
          <p className="SaleText">{`${currentBrand.saleStartDate.slice(
            2
          )} ~ ${currentBrand.saleEndDate.slice(2)}`}</p>
        </div>
      )}
      {currentBrand.officialStoreList.length > 0 && (
        <div className="StoreWrap">
          <div className="StoreList">
            {currentBrand.officialStoreList.map((e, i) => (
              <div key={i}>
                <OfflineStore store={e} />
              </div>
            ))}
            {/* {currentBrand.storeList.map((e, i) => (
          <Link to={`/collection/${e.id}`} key={i}>
            <Store store={e} />
          </Link>
        ))} */}
          </div>
        </div>
      )}
    </InfoAreaStyle>
  );
}

const InfoAreaStyle = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;

  .OfficialButtonWrap {
    height: 36px;
    margin-right: 12px;
    margin-bottom: 30px;
    .OfficialButtonLink {
      height: 36px;
      padding: 0px 32px;
      display: flex;
      align-items: center;
      border: 1px solid black;
    }
  }

  .LogoWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 30px;
    img {
      border-radius: 8px;
      object-fit: contain;
    }
  }

  .DescriptionWrap {
    width: 100%;
    padding: 0px 32px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    p {
      text-align: center;
    }
  }

  .TitleWrap {
    position: relative;
    width: 100%;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    align-items: center;
    padding: 16px 12px 16px 16px;

    border-bottom: 1px solid var(--line-color);
    .BrandName {
      h1 {
        font-size: 17px;
        font-weight: 600;
      }
    }
    .ScrapWrap {
      width: fit-content;
      display: flex;

      .ScrapNum {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-right: none;
      }

      .ButtonWrap {
        width: 120px;
      }
    }
    .Setting {
      position: absolute;
      top: -12px;
      right: 16px;
      cursor: pointer;
    }
  }
  .SaleWrap {
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0px 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);

    .SaleName {
      color: #f33131;
    }
    .SaleText {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .StoreWrap {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid var(--line-color);
    .StoreList {
      height: 240px;
      display: flex;
      gap: 12px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
