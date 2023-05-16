import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../common/LoginModal";

interface IsCart {}

export default function Account({}: IsCart) {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  const onSignout = () => {
    signout();
    nav("/");
  };

  const exitPage = () => {
    nav("/");
  };

  if (!user.uid) {
    return (
      <div>
        <LoginModal exitModal={exitPage} />
      </div>
    );
  }

  return (
    <AccountBlock>
      <p>{user.username}</p>
      <p className="Logout" onClick={onSignout}>
        Logout
      </p>
    </AccountBlock>
  );
}

const AccountBlock = styled.div`
  padding: 40px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .Logout {
    color: #f33131;
    cursor: pointer;
  }
`;
