import styled from "styled-components";
import Input from "../../common/components/Input";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Button from "../../common/components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    id: "",
    password: "",
  });

  const nav = useNavigate();
  const { user } = useAuth();
  const { loginWithGoogle } = useAuth();

  const onChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const onSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
  };

  const onGoogleLogin = () => {
    loginWithGoogle();
    // nav("/account");
  };

  useEffect(() => {
    if (user.uid) {
      nav("/account");
    }
  }, [user.uid]);

  return (
    <LoginWrap>
      <form>
        <Input
          name="id"
          value={input.id}
          placeholder="ID"
          onChange={onChange}
        />
        <Input
          name="password"
          value={input.password}
          placeholder="Password"
          onChange={onChange}
        />
        <Button onClick={onSubmit}>LOGIN</Button>
      </form>
      <div className="OAuthWrap">
        <div className="Google" onClick={onGoogleLogin}></div>
      </div>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  padding: 120px 0px 20px 0px;
  .OAuthWrap {
    .Google {
      width: 40px;
      height: 40px;
      background-color: #dddddd;
    }
  }
`;
