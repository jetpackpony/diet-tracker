import styles from './Login.module.css';
import { FormSubmitCallback, useControlledFormHook } from "../../hooks/useForm";
import { isQueryLoginArgs, useLogin } from "../../hooks/useLogin";
import { LoginQueryVariables } from "../../generated/graphql";
import Input from '../Input';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';

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
  performLogin: (args: LoginQueryVariables) => void,
  loading: boolean,
  error: string | undefined
}

const Login = ({ performLogin, loading, error }: LoginProps) => {
  const submitForm: FormSubmitCallback = (values) => {
    if (!isQueryLoginArgs(values)) {
      console.error("Login args are incorrect: ", values);
      return;
    }
    performLogin(values);
  };
  const { initForm, onSubmit } = useControlledFormHook(submitForm);

  return (
    <form onSubmit={onSubmit} ref={initForm} className={styles.loginForm}>
      <h1>Login</h1>
      {
        (loading)
          ? (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )
          : (
            <div className={styles.loginContainer}>
              {
                error
                  ? (
                    <div className={styles.errorContainer}>{error}</div>
                  )
                  : null
              }
              <Input fieldType="text" labelText="Username" name="userName" />
              <Input fieldType="password" labelText="Password" name="password" />
              <Button buttonProps={{ name: "submit", type: "submit" }} text="Submit" />
            </div>
          )
      }
    </form >

  );
};

export default LoginContainer;