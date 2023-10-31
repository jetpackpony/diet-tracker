import styles from "./Login.module.css";
import { isQueryLoginArgs, useLogin } from "../../hooks/useLogin";
import { LoginQueryVariables } from "../../generated/graphql";
import Input from "../Input";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";

const LoginContainer = () => {
  const { performLogin, loading, error } = useLogin();

  return (
    <Login
      performLogin={performLogin}
      loading={loading}
      error={error && error.toString()}
    />
  );
};

interface LoginProps {
  performLogin: (args: LoginQueryVariables) => void;
  loading: boolean;
  error: string | undefined;
}

const Login = ({ performLogin, loading, error }: LoginProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isQueryLoginArgs({ userName, password })) {
      console.error("Login args are incorrect: ", { userName, password });
      return;
    }
    performLogin({ userName, password });
  };

  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <h1>Login</h1>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.messageContainer}>
            ⚠️ If you want to test a demo version of this project, login using
            userName: demo, password: demo.
          </div>
          {error && <div className={styles.errorContainer}>{error}</div>}
          <Input
            fieldType="text"
            labelText="Username"
            name="userName"
            value={userName}
            onInput={(value) => setUserName(value)}
          />
          <Input
            fieldType="password"
            labelText="Password"
            name="password"
            value={password}
            onInput={(value) => setPassword(value)}
          />
          <Button
            buttonProps={{ name: "submit", type: "submit" }}
            text="Submit"
          />
        </div>
      )}
    </form>
  );
};

export default LoginContainer;
