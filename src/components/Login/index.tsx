import React from "react";
import { useLazyQuery, gql } from "@apollo/client";
import styles from '../AddForm/AddForm.module.css';
import { FormSubmitCallback, useControlledFormHook } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";
import { QueryLoginArgs } from "../../generated/graphql";

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
  performLogin: (args: QueryLoginArgs) => void,
  loading: boolean,
  error: string | undefined
}

const isQueryLoginArgs = (args: any): args is QueryLoginArgs => {
  if (args['userName'] === undefined || typeof args['userName'] !== 'string') {
    return false;
  }
  if (args['password'] === undefined || typeof args['password'] !== 'string') {
    return false;
  }
  return true;
};

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