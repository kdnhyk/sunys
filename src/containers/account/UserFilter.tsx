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
  top: 0px; */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 16px 16px;

  background-color: var(--background-color);
  /* background-color: rgba(252, 252, 252, 0.9); */

  z-index: 10;
  border-bottom: 1px solid var(--line-color);
  .AllWrap {
    h3 {
      padding: 0px 4px;
    }
  }
`;
