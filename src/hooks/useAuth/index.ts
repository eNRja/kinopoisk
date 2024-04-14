import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../components/fake-auth";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a FakeAuth provider");
  }
  return context;
};
