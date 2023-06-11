import styled from "styled-components";

interface IsUserFilter {}

export const UserFilter = ({}: IsUserFilter) => {
  return (
    <UserFilterStyle>
      <div className="AllWrap">
        <h3>MY 컬렉션</h3>
      </div>
      {/* <div className="AllWrap">
        <h3>상품</h3>
      </div> */}
    </UserFilterStyle>
  );
};

export default UserFilter;

const UserFilterStyle = styled.div`
  /* position: sticky;
  top: 50px; */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 12px 16px;
  background-color: var(--background-color);

  z-index: 10;
  /* border-bottom: 1px solid var(--line-color); */
  div {
    h3 {
      padding: 0px 4px 8px 4px;
      border-bottom: 1px solid black;
    }
  }
`;
