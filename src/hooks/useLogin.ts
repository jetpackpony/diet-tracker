import { useLazyQuery } from "@apollo/client";
import {
  IsLoggedInDocument,
  LoginDocument,
  LoginQueryVariables,
  QueryLoginArgs,
} from "../generated/graphql";
import { setStorageItem } from "../storage";

export function isQueryLoginArgs(obj: any): obj is QueryLoginArgs {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.password === "string" &&
    typeof obj.userName === "string"
  );
}

export const useLogin = () => {
  const [login, { loading, error, data, client }] = useLazyQuery(LoginDocument);
  const performLogin = ({ userName, password }: LoginQueryVariables) => {
    login({ variables: { userName, password } });
  };

  if (data && data.login) {
    setStorageItem("auth-token", data.login.token);
    client.writeQuery({
      query: IsLoggedInDocument,
      data: {
        isLoggedIn: true,
      },
    });
  }

  return {
    performLogin,
    loading,
    error,
  };
};
