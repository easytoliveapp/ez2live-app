import { ROLES } from "@/constants/roles";
import { useSession } from "next-auth/react";

const GetUserRole = (condition: "isSupplier" | "isAdmin" | "isCommomUser") => {
  const { data: session } = useSession();
  const userRole = session?.user.role;

  switch (condition) {
    case "isCommomUser":
      return userRole === ROLES.commomUser;
    case "isSupplier":
      return userRole === ROLES.supplier;
    case "isAdmin":
      return userRole === ROLES.admin;
    default:
      return false;
  }
};

export default GetUserRole;
