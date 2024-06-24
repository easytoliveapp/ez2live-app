import { ROLES } from "@/constants/roles";
import { useSession } from "next-auth/react";

const useUserRoles = () => {
  const { data: session } = useSession();
  const loggedUserRole = session?.user.role;

  return {
    isSupplier: () => loggedUserRole === ROLES.supplier,
    user.isCommon: () => loggedUserRole === ROLES.commonUser,
    isAdmin: () => loggedUserRole === ROLES.admin,
  };
};
export default useUserRoles;
