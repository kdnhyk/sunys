import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { signout } = useAuth();
  const nav = useNavigate();

  const onSignout = () => {
    signout();
    nav("/");
  };
  return (
    <AccountWrap>
      <p onClick={onSignout}>Logout</p>
    </AccountWrap>
  );
}

const AccountWrap = styled.div`
  padding: 40px 16px 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    cursor: pointer;
  }
`;
