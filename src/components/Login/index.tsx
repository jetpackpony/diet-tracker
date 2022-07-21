import React from "react";
import { useLazyQuery, gql } from "@apollo/client";
import styles from '../AddForm/AddForm.module.css';
import { useControlledFormHook } from "../../hooks/useForm";
import { setStorageItem } from "../../storage";
import { IsLoggedInDocument, LoginDocument } from "../../generated/graphql";

const LoginContainer = () => {
  const [login, { loading, error, data, client }] = useLazyQuery(LoginDocument);
  const performLogin = ({ userName, password }) => {
    login({ variables: { userName, password } });
  };

  if (data && data.login) {
    setStorageItem("auth-token", data.login.token);
    client.writeQuery({
      query: IsLoggedInDocument,
      data: {
        isLoggedIn: true
      }
    });
  }

  return (
    <Login
      performLogin={performLogin}
      loading={loading}
      error={error && error.toString()}
    />
  );
};

const Login = ({ performLogin, loading, error }) => {
  const submitForm = (values) => {
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
        <div className={styles.fieldContainer}>
          <label htmlFor="userName">
            <span>User Name: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="text" id="userName" name="userName"
              defaultValue=""
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="password">
            <span>Password: </span>
          </label>
          <div className={styles.inputContainer}>
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
              <div className={styles.fieldContainer}>
                <button type="submit" id="submit" name="submit">Submit</button>
              </div>
            )
        }
      </div>
    </form>

  );
};

export default LoginContainer;