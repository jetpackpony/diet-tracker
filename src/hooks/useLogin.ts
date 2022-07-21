import { useLazyQuery } from "@apollo/client";
import { IsLoggedInDocument, LoginDocument, QueryLoginArgs } from "../generated/graphql";
import { setStorageItem } from "../storage";

export const useLogin = () => {
  const [login, { loading, error, data, client }] = useLazyQuery(LoginDocument);
  const performLogin = ({ userName, password }: QueryLoginArgs) => {
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

  return {
    performLogin,
    loading,
    error
  };
};