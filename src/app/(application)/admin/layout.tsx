import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const PublicRoutesRedirect = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
      return redirect("/");
    }
  };

  await PublicRoutesRedirect();

  return (
    <div className="admin-layout">
      <div className="admin-layout__container">{children}</div>
    </div>
  );
};

export default AdminLayout;
