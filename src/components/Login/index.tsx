import styles from '../AddForm/AddForm.module.css';
import { FormSubmitCallback, useControlledFormHook } from "../../hooks/useForm";
import { isQueryLoginArgs, useLogin } from "../../hooks/useLogin";
import { LoginQueryVariables } from "../../generated/graphql";

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
    <form onSubmit={onSubmit} ref={initForm}>
      <h1>Login</h1>
      {
        error
          ? (
            <div>{error}</div>
          )
          : null
      }
      <div className={styles.formContainer}>
        <div>
          <label htmlFor="userName">
            <span>User Name: </span>
          </label>
          <div>
            <input type="text" id="userName" name="userName"
              defaultValue=""
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">
            <span>Password: </span>
          </label>
          <div>
            <input type="password" id="password" name="password"
              defaultValue=""
            />
          </div>
        </div>

        {
          loading
            ? (
              <div>Loading...</div>
            )
            : (
              <div>
                <button type="submit" id="submit" name="submit">Submit</button>
              </div>
            )
        }
      </div>
    </form>

  );
};

export default LoginContainer;