import { ROLES } from "@/constants/roles";
import { useSession } from "next-auth/react";

const UserRoles = () => {
  const { data: session } = useSession();
  const loggedUserRole = session?.user?.role;

  return {
    isSupplier: () => loggedUserRole === ROLES.supplier,
    isCommonUser: () => loggedUserRole === ROLES.commonUser,
    isAdmin: () => loggedUserRole === ROLES.admin,
  };
};

export default UserRoles();
