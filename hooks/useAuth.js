import { useDispatch } from "react-redux";
import { useDB } from "./useDB";
import { setUser } from "@/features/Auth/AuthSlice";
import { router } from "expo-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { getSession } = useDB();

  const authUser = async () => {
    try {
      const session = await getSession();
      if (session) {
        const userData = session;
        dispatch(
          setUser({
            email: userData.email,
            localId: userData.localId,
            idToken: userData.token,
          })
        );
        return userData;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return authUser;
};
