import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  const onSignout = () => {
    signout();
    nav("/");
  };
  return (
    <AccountWrap>
      <p>{user.username}</p>
      <p onClick={onSignout}>Logout</p>
    </AccountWrap>
  );
}

const AccountWrap = styled.div`
  padding: 60px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 30px;
    cursor: pointer;
  }
`;
